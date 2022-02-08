import { AcceptedElements, MotionKeyframesDefinition } from '@motionone/dom';
import { AnimationControls } from '@motionone/types';
import { createSignal } from 'solid-js';

import { timeline } from 'motion';
import { TimelineOptions } from '@motionone/dom/types/timeline';
import { TimelineDefinition } from '@motionone/dom/types/timeline/types';

import { AnimationListOptions } from '@motionone/dom/types/animate/types';

// TODO: Place all these types/interfaces in another file

interface UseAnimationTypes {
    onFinish: (res: (value?: unknown) => void) => void;
}

type ModifiedAcceptedElements = AcceptedElements | (() => HTMLElement);

type segment =
    | [ModifiedAcceptedElements, MotionKeyframesDefinition]
    | [ModifiedAcceptedElements, MotionKeyframesDefinition, AnimationListOptions];

export type SequenceDefination = segment[];

interface UseAnimationTypes {
    onFinish: (res: (value?: unknown) => void) => void;
}

interface UseMotionTimelineReturn {
    play: () => void;
    reset: () => void;
    replay: () => void;
    isFinished: boolean;
    timelineInstance: AnimationControls | null;
}

/**
 * `useMotionTimeline` returns `timelineInstance` (Animation Controls) that are returned by `timeline` and some helper functions and state
 * for Example: `play`, `reset`, `replay` and `isFinished`
 * @param sequence - `sequence` is an array, defines animations with the same settings as the animate function. In the arrays,  Element can be either a string or a ref.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/timeline#options) for the values you could pass into this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */

const convertRefsFunctionsToElement = (
    sequence: SequenceDefination,
): TimelineDefinition => {
    const newArray = [...sequence];
    newArray.forEach((array) => {
        if (array[0] && typeof array[0] === 'function') {
            array[0] = array[0]();
        }
    });
    return newArray as TimelineDefinition;
};

export const useMotionTimeline = (
    sequence: SequenceDefination,
    options?: TimelineOptions,
    events?: UseAnimationTypes,
): UseMotionTimelineReturn => {
    const [getTimelineInstance, setTimelineInstance] =
        createSignal<AnimationControls | null>(null);
    const [getIsFinished, setIsFinished] = createSignal(true);

    const play = async () => {
        const currentTimelineInstance = timeline(
            convertRefsFunctionsToElement(sequence),
            options,
        );
        setIsFinished(false);
        setTimelineInstance(currentTimelineInstance);
        await currentTimelineInstance.finished.then((res) => {
            events && events.onFinish(res);
            setIsFinished(true);
        });
    };

    const reset = () => {
        getTimelineInstance() && getTimelineInstance()?.stop();
        sequence.forEach((el) => {
            let selector = el[0];
            if (typeof selector === 'function') {
                selector().setAttribute('style', '');
            } else if (typeof selector === 'string') {
                let selectedElements: NodeListOf<HTMLElement> =
                    document.querySelectorAll(selector);

                selectedElements.forEach((el) => {
                    el.style && el.removeAttribute('style');
                });
            }
        });
    };

    const replay = () => {
        reset();
        getIsFinished() && play();
    };

    return {
        timelineInstance: getTimelineInstance(),
        play,
        reset,
        replay,
        isFinished: getIsFinished(),
    };
};
