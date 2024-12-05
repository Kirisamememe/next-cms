// 'use client'

// import { Button } from "@/components/ui/button";
// import { FlexColumn } from "@/components/ui/flexbox";
// import { Plus } from "lucide-react";
// import { JsonNodeData } from "@/types";
// import { cn } from "@/lib";
// import JsonNode from "../json-node";
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// type Props = {
//   data: JsonNodeData
//   onDataChange: (newData: JsonNodeData) => void;
//   handleAddChild: (position: "start" | "end") => void,
// }


// export function ArrObjNode({ data, onDataChange, handleAddChild }: Props) {
  

//   return (
//     <DragDropContext onDragEnd={() => {}}>
//       <Droppable droppableId={`droppable_${data.id}`}>
//         {(provided, snapshot) => (
//           <FlexColumn 
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             className={cn(
//             "relative w-fit z-0", snapshot.isDraggingOver && "bg-muted/20",
//             data.id !== 'root' && "pl-8 pb-6 mb-2",
//           )}>

//             {data.id !== 'root' && (<div className={cn(
//               "absolute -top-0 left-0 h-full w-4 rounded-bl-full border-l-2 border-b-2",
              
//             )}>
//               <div className={cn(
//                 "absolute -bottom-2 left-2 size-3 border-2 rounded-full bg-background",
                
//               )} />
//             </div>)}

//             <Button
//               variant="secondary" onClick={() => handleAddChild('start')}
//               className={cn(
//                 "w-[26rem] h-6 opacity-40 hover:opacity-100 mt-5 mb-2",
//               )}>
//               <Plus size={16} />
//             </Button>

//             {(data.children || []).map((child, index) => (
//               <JsonNode
//                 key={child.id}
//                 data={child}
//                 index={index}
//                 parentIsArr={data.valueType === 'array'}
//                 onChange={(newChild) => {
//                   const newChildren = (data.children || []).map((c) =>
//                     c.id === newChild.id ? newChild : c
//                   );
//                   onDataChange({ ...data, children: newChildren });
//                 }}
//                 onDelete={() => {
//                   const newChildren = (data.children || []).filter((c) => c.id !== child.id);
//                   onDataChange({ ...data, children: newChildren });
//                 }}
//               />
//             ))}
//             {provided.placeholder}

//             <Button
//               variant="secondary" onClick={() => handleAddChild("end")}
//               className={cn(
//                 "w-[26rem] h-6 opacity-40 hover:opacity-100 mt-2",
//               )}>
//               <Plus size={16} />
//             </Button>
            
//             {/* {`droppable_${data.id}`} */}
//           </FlexColumn>
//         )}
//       </Droppable>
//     </DragDropContext>
//   )
// }