import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";
import { useOnClickOutside } from "@/lib/layout";

gsap.registerPlugin(useGSAP, Draggable);

export const useRandomPosition = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imageWidth = ref.current.clientWidth;
    const imageHeight = ref.current.clientHeight;

    const minLeft = imageWidth * 0.3;
    const minTop = imageHeight * 0.3;
    const maxLeft = screenWidth - (imageWidth * 1.3);
    const maxTop = screenHeight - (imageHeight * 1.3);

    const randomLeft = gsap.utils.random(minLeft, maxLeft);
    const randomTop = gsap.utils.random(minTop, maxTop);
    const randomRotation = gsap.utils.random(-20, 20);

    const centeredConfig = {
      top: (screenHeight / 2) - (imageHeight / 2),
      left: (screenWidth / 2) - (imageWidth / 2),
      rotation: 0,
    };

    gsap.set(ref.current, {
      ...centeredConfig,
      opacity: 0,
    });

    const tween = gsap.to(ref.current, {
      top: randomTop,
      left: randomLeft,
      rotation: randomRotation,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    return () => {
      tween.kill();
    };
  }, [ref]);
};

export const useExpand = (ref: RefObject<HTMLDivElement>) => {
  const initialConfigRef = useRef<gsap.TweenVars>({top: 0, left: 0, rotation: 0, width: 0, height: 0});
  const [isExpanded, setExpanded] = useState(false);

  const expand = () => {
    if (!ref.current) {
      return;
    }

    const screenWidth = window.innerWidth;
    const newImageWidth = screenWidth * 0.9;

    initialConfigRef.current.height = ref.current.offsetHeight;
    initialConfigRef.current.width = ref.current.offsetWidth;
    initialConfigRef.current.top = ref.current.offsetTop;
    initialConfigRef.current.left = ref.current.offsetLeft;
    initialConfigRef.current.rotation = gsap.utils.random(-20, 20);
    
    gsap.killTweensOf(ref.current);

    gsap.to(ref.current, {
      top: '15%',
      left: '5%',
      rotation: 0,
      width: newImageWidth,
      height: 'auto',
      duration: 0.4,
      ease: 'expo.out',
      attr: { ["data-expanded"]: 'true' }
    });

    setExpanded(true);
  }
  
  const collapse = () => {
    if (!ref.current || !isExpanded) {
      return;
    }

    gsap.killTweensOf(ref.current);
  
    gsap.to(ref.current, {
      ...initialConfigRef.current,
      duration: 0.2,
      ease: 'power3.inOut',
      attr: { ["data-expanded"]: 'false' }
    });

    setExpanded(false);
  }

  const onClick = () => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }
  }

  useOnClickOutside(ref, collapse);

  return {
    onClick,
  }
}

export const useDraggable = (ref: RefObject<HTMLDivElement>) => {
  const draggableRef = useRef<Draggable | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const draggable = Draggable.create(ref.current, {
      type: 'top,left',
      allowContextMenu: false,
      dragResistance: 0.1,
      touchAction: 'none',
    })[0];

    draggableRef.current = draggable;

    return () => {
      draggable.kill();
    };
  }, [ref]);
}