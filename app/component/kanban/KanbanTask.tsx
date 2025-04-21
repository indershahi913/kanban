// components/kanban/KanbanTask.tsx
import { DragEvent } from 'react';
import { Task, ColumnType, TaskProps } from '@/types/kanban';

export default function KanbanTask({ task, column, onDragStart, onEditTask, onDeleteTask }: TaskProps) {
    const handleDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text/plain', ''); // Required for Firefox
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(task.id, column);
    };

    const handleClick = () => {
        onEditTask?.(task);
    };

    const columnColors = {
        todo: 'bg-blue-50',
        inProgress: 'bg-yellow-50',
        done: 'bg-green-50'
    };
    const priorityColors = {
        high: 'bg-red-100 border-red-300',
        medium: 'bg-yellow-100 border-yellow-300',
        low: 'bg-green-100 border-green-300'
    };
    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={`p-3 border rounded-lg ${columnColors[column]} ${priorityColors[task.priority]} cursor-move hover:shadow transition relative group`}
        >
            <div className="flex justify-between items-start">
                <div onClick={handleClick} className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium">{task.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high'
                                ? 'bg-red-500 text-white'
                                : task.priority === 'medium'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-green-500 text-white'
                            }`}>
                            {task.priority}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                </div>
            </div>

            {/* Delete button */}
            {onDeleteTask && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                >
                    ×
                </button>
            )}
        </div>

    );
}