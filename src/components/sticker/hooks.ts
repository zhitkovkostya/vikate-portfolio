import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, Draggable);

const useInitialConfig = (ref: RefObject<HTMLDivElement>) => {
  const initialConfigRef = useRef({top: 0, left: 0, rotation: 0});

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
    const randomRotation = gsap.utils.random(-25, 25);
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

    initialConfigRef.current = {
      ...randomConfig,
    }
  }, [initialConfigRef, ref]);
}

export const useExpand = (ref: RefObject<HTMLDivElement>) => {
  const { initialConfigRef } = useInitialConfig(ref);
  console.log(initialConfigRef.current);

  const expand = () => {
    if (!ref.current) {
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imageRect = ref.current.getBoundingClientRect();
    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;
    const centerCoords = {
      top: (screenHeight / 2) - (imageHeight / 2),
      left: (screenWidth / 2) - (imageWidth / 2),
      rotation: 0,
    }
  
    gsap.to(ref.current, {
      ...centerCoords,
    });
  }
  
  const collapse = () => {
    if (!ref.current) {
      return;
    }

    console.log(initialConfigRef.current);
  
    gsap.to(ref.current, {
      ...initialConfigRef.current,
    });
  }

  return {
    expand,
    collapse,
  }
}

export const useDraggable = (ref: RefObject<HTMLDivElement>) => {
  const draggableRef = useRef<Draggable | null>(null);
  const { initialConfigRef } = useInitialConfig(ref);

  console.log(initialConfigRef.current);

  // const draggable = Draggable.create(ref.current, {
  //   type: 'x,y',
  //   allowContextMenu: false,
  //   dragResistance: 0.1,
  //   touchAction: 'none',
  //   // onDragEnd() { 
  //   //   if (!ref.current || !isLoaded) {
  //   //     return;
  //   //   }

  //   //   const rect = ref.current?.getBoundingClientRect();
      
  //   //   if (!rect) {
  //   //     return;
  //   //   }

  //   //   position.current.x = (rect.left / window.innerWidth) * 100;
  //   //   position.current.y = (rect.top / window.innerHeight) * 100;
  //   // }
  // });

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

        initialConfigRef.current.top = imageRect.top;
        initialConfigRef.current.left = imageRect.left;
      },
    })[0];
  }, [initialConfigRef, ref]);
}