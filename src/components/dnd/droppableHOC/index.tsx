import { ComponentType, PropsWithChildren } from "react";
import { Droppable } from "@hello-pangea/dnd";

function withDroppable<T>(WrappedComponent: ComponentType<T>, id: string) {
  const DroppableComponent = function (props: PropsWithChildren<T>) {
    return (
      <Droppable droppableId={id}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <WrappedComponent {...props} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  };
  return DroppableComponent;
}

export default withDroppable;
