import {
    AcceptedElements,
    MotionKeyframesDefinition,
    AnimationOptionsWithOverrides,
} from '@motionone/dom';
import { animate } from 'motion';
import { AnimationControls } from '@motionone/types';

import { createSignal } from 'solid-js';

type ModifiedAcceptedElements = AcceptedElements | (() => HTMLElement);

interface MotionAnimateEvents {
    onFinish: (res: (value?: unknown) => void) => void;
}

/**
 * `useMotionAnimate` returns `animateInstance`(Animation Controls) returned by `animate` and some helper functions and state
 * for Example: `play`, `reset`, `replay` and `isFinished`
 * @param selector - The target element, can be string or a ref
 * @param keyframes - Element will animate from its current style to those defined in the keyframe. Refer to [motion's docs](https://motion.dev/dom/animate#keyframes) for more.
 * @param options - Optional parameter. Refer to [motion doc's](https://motion.dev/dom/animate#options) for the values you could pass to this.
 * @param events - Pass functions of whatever you want to happen when a event like `onFinish` happens.
 */
export const useMotionAnimate = (
    selector: ModifiedAcceptedElements,
    keyframes: MotionKeyframesDefinition,
    options?: AnimationOptionsWithOverrides,
    events?: MotionAnimateEvents,
) => {
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
        animateInstance: getAnimateInstance(),
        play,
        reset,
        replay,
        isFinished: getIsFinished(),
    };
};
