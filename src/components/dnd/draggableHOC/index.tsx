import { ComponentType, PropsWithChildren } from "react";
import { Draggable } from "@hello-pangea/dnd";

function withDraggable<T>(WrappedComponent: ComponentType<T>, id: string, index: number) {
  const DraggableComponent = function (props: PropsWithChildren<T>) {
    return (
      <Draggable draggableId={id} index={index}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <WrappedComponent {...props} />
            </div>
          );
        }}
      </Draggable>
    );
  };

  return DraggableComponent;
}

export default withDraggable;
