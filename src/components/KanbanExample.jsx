import React, {useState} from 'react';
import {ThemeIcon} from './ThemeIcon';
const columns=['To review','In progress','Shared learning'];
const initial=[{title:'Make tool locations clearer',stage:0},{title:'Review a workstation hand-off',stage:0},{title:'Share a useful setup tip',stage:0}];
export function KanbanExample(){
 const [items,setItems]=useState(initial);
 return <section className="brief-section wrap kanban-example" aria-labelledby="kanban-title">
  <div className="section-heading"><div><span className="eyebrow">KAIZEN & VISUAL MANAGEMENT</span><h2 id="kanban-title">See the work. Keep improving.</h2></div><ThemeIcon name="kanban" size={72}/></div>
  <p>Small Kaizen improvements start with observation. Kanban makes priorities and hand-offs visible, helping people see what needs attention next.</p>
  <p className="kanban-note">Try this illustrative board: move an idea through the learning cycle. These are example tasks, not live NHB operations.</p>
  <div className="kanban-board">{columns.map((column,stage)=><div className="kanban-column" key={column}><h3><span className={`kanban-dot stage-${stage}`} />{column}<span className="kanban-count">{items.filter(item=>item.stage===stage).length}</span></h3>{items.filter(item=>item.stage===stage).map(item=><article className="kanban-task" key={item.title}><p>{item.title}</p>{stage<2?<button onClick={()=>setItems(current=>current.map(task=>task.title===item.title?{...task,stage:stage+1}:task))} aria-label={`Move ${item.title} to ${columns[stage+1]}`}>{stage===0?'Start improvement':'Share learning'} <span aria-hidden="true">→</span></button>:<span className="kanban-complete">Learning shared ✓</span>}</article>)}{!items.some(item=>item.stage===stage)&&<p className="kanban-empty">{stage===2?'Learning will appear here.':'Space for the next idea.'}</p>}</div>)}</div>
  <button className="text-link kanban-reset" onClick={()=>setItems(initial)}>Reset example</button>
 </section>;
}
