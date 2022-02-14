import {
    AcceptedElements,
    MotionKeyframesDefinition,
    AnimationOptionsWithOverrides,
} from '@motionone/dom';
import { animate } from 'motion';
import { AnimationControls } from '@motionone/types';

import { Accessor, createSignal } from 'solid-js';

export type ModifiedAcceptedElements = AcceptedElements | (() => HTMLElement);

export interface CreateAnimationEvents {
    onFinish: (res: (value?: unknown) => void) => void;
}

interface CreateAnimationReturn {
    play: () => void;
    reset: () => void;
    replay: () => void;
    getIsFinished: Accessor<boolean>;
    getAnimateInstance: Accessor<AnimationControls | null>;
}

/**
 * `createAnimation` returns `animateInstance`(Animation Controls) returned by `animate` and some helper functions and state
 * for Example: `play`, `reset`, `replay` and `isFinished`
 * @param selector - The target element, can be string or a ref
 * @param keyframes - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
export const createAnimation = (
    selector: ModifiedAcceptedElements,
    keyframes: MotionKeyframesDefinition,
    options?: AnimationOptionsWithOverrides,
    events?: CreateAnimationEvents,
): CreateAnimationReturn => {
    const [getAnimateInstance, setAnimateInstance] =
        createSignal<AnimationControls | null>(null);
    const [getIsFinished, setIsFinished] = createSignal(true);
    const play = async () => {
        if (selector) {
            let selectedType = selector;
            if (typeof selector === 'function') {
                selectedType = selector();
            } else {
                // if string
                selectedType = selector;
            }
            if (selectedType) {
                const currentAnimateInstance = animate(
                    selectedType,
                    keyframes,
                    options,
                );
                setIsFinished(false);
                setAnimateInstance(currentAnimateInstance);
                await currentAnimateInstance.finished.then((res) => {
                    events && events.onFinish(res);
                    setIsFinished(true);
                });
            }
        }
    };

    const reset = () => {
        getAnimateInstance() && getAnimateInstance()?.stop();
        if (typeof selector === 'function') {
            selector().setAttribute('styled', '');
        } else if (typeof selector === 'string') {
            let selectedElements = document.querySelectorAll(selector);

            selectedElements.forEach((el) => {
                el.getAttribute('style') && el.removeAttribute('style');
            });
        }
    };

    const replay = () => {
        reset();
        getIsFinished() && play();
    };

    return {
        getAnimateInstance,
        play,
        reset,
        replay,
        getIsFinished,
    };
};
