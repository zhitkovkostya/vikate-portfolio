import { RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, Draggable);

export const useDraggable = (ref: RefObject<HTMLDivElement>) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const position = useRef({x: 0, y: 0, rotation: 0, width: 0})

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const img = ref.current.querySelector('img');
    
    if (!img) {
      return;
    }
    
    img.onload = () => setIsLoaded(true);

    return () => {
      img.onload = null;
    };
  }, [ref]);

  useGSAP(() => {
    if (ref.current) {
      const imageWidth = ref.current.clientWidth;
      const imageHeight = ref.current.clientHeight;
      const containerWidth = window.screen.width;
      const containerHeight = window.screen.height;

      const maxX = ((containerWidth - imageWidth) / containerWidth) * 100;
      const maxY = ((containerHeight - imageHeight) / containerHeight) * 92;

      const positionX = gsap.utils.random(0, maxX);
      const positionY = gsap.utils.random(8, maxY);
      const rotation = gsap.utils.random(-25, 25);

      position.current = {
        x: positionX,
        y: positionY,
        rotation: rotation,
        width: imageWidth
      }

      gsap.to(ref.current, {
        duration: 0.15,
        x: 0,
        y: 0,
        top: `${positionY}%`,
        left: `${positionX}%`,
        rotate: rotation,
      });

      const draggable = Draggable.create(ref.current, {
        type: 'x,y',
        allowContextMenu: false,
        dragResistance: 0.1,
        touchAction: 'none',
        onDragEnd() { 
          const rect = ref.current?.getBoundingClientRect();
          
          if (!rect) {
            return;
          }

          position.current.x = (rect.left / window.innerWidth) * 100;
          position.current.y = (rect.top / window.innerHeight) * 100;
        }
      });

      return () => {
        draggable.forEach(instance => instance.kill());
      };
    }    
  }, [ref]);

  const onClick = () => {
    if (!ref.current) {
      return;
    }

    // Очистка активных анимаций
    gsap.killTweensOf(ref.current);

    // Новая анимация
    gsap.to(ref.current, {
      duration: 0.3,
      fade: true,
      rotate: isActive ? position.current.rotation : 0,
      x: 0,
      y: 0,
      top: isActive ? `${position.current.y}%` : '10%',
      left: isActive ? `${position.current.x}%` : '50%',
      transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(-50%, 0, 0)',
      width: isActive ?  position.current.width : '90%',
      ease: "power1.inOut",
      onStart() {
        if (!ref.current) {
          return;
        }

        ref.current.dataset.active = String(!isActive);        

        setIsActive(previousIsActive => !previousIsActive);
      }
    });
  };

  return {
    onClick,
  }
}