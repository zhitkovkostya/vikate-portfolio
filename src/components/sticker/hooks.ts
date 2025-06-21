import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";
import { useOnClickOutside } from "@/lib/layout";

gsap.registerPlugin(useGSAP, Draggable);

const useInitialConfig = (ref: RefObject<HTMLDivElement>) => {
  const initialConfigRef = useRef({top: 0, left: 0, rotation: 0, width: 0, height: 0});

  return { initialConfigRef };
}

export const useRandomPosition = (ref: RefObject<HTMLDivElement>) => {
  const { initialConfigRef } = useInitialConfig(ref);
 
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imageRect = ref.current.getBoundingClientRect();
    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;
    const minLeft = imageWidth * 0.15;
    const maxLeft = screenWidth - (imageWidth * 1.15);
    const minTop = imageHeight * 0.15;
    const maxTop = screenHeight - (imageHeight * 1.15);
    const randomLeft = gsap.utils.random(minLeft, maxLeft);
    const randomTop = gsap.utils.random(minTop, maxTop);
    const randomRotation = gsap.utils.random(0, 0);
    const randomConfig = {
      top: randomTop,
      left: randomLeft,
      rotation: randomRotation,
    };
    const centeredConfig = {
      top: (screenHeight / 2) - (imageHeight  / 2),
      left: (screenWidth / 2) - (imageWidth / 2),
      rotation: 0,
    };


    gsap.set(ref.current, {
      ...centeredConfig,
    });

    gsap.to(ref.current, {
      ...randomConfig,
    });
  }, [initialConfigRef, ref]);
}

export const useExpand = (ref: RefObject<HTMLDivElement>) => {
  const [isExpanded, setExpanded] = useState(false);
  const { initialConfigRef } = useInitialConfig(ref);

  const expand = () => {
    if (!ref.current) {
      return;
    }

    const screenWidth = window.innerWidth;
    const imageRect = ref.current.getBoundingClientRect();
    const currentImageWidth = imageRect.width;
    const currentImageHeight = imageRect.height;
    const newImageWidth = screenWidth * 0.9;
    const centerCoords = {
      top: '15%',
      left: '5%',
      rotation: 0,
    }

    initialConfigRef.current = {
      width: currentImageWidth,
      height: currentImageHeight,
      top: imageRect.top,
      left: imageRect.left,
      rotation: 0,
    }
  
    gsap.to(ref.current, {
      ...centerCoords,
      width: newImageWidth,
      height: 'auto',
    });
    
    setExpanded(true);
  }
  
  const collapse = () => {
    if (!ref.current || !isExpanded) {
      return;
    }

    console.log(initialConfigRef.current);
  
    gsap.to(ref.current, {
      ...initialConfigRef.current,
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
  const { initialConfigRef } = useInitialConfig(ref);

  useEffect(() => {
    draggableRef.current = Draggable.create(ref.current, {
      type: 'top,left',
      allowContextMenu: false,
      dragResistance: 0.1,
      touchAction: 'none',
      onDragEnd() { 
        if (!ref.current) {
          return;
        }

        const imageRect = ref.current.getBoundingClientRect();
        
        if (!imageRect) {
          return;
        }

        // initialConfigRef.current.top = imageRect.top;
        // initialConfigRef.current.left = imageRect.left;

        // console.log(initialConfigRef.current);
      },
    })[0];
  }, [initialConfigRef, ref]);
}