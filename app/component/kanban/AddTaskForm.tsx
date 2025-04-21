import { Priority, Task } from '@/app/types/kanban';
import { ColumnType } from '@/types/kanban';
import { FormEvent, useState } from 'react';

type Props = {
    onSubmit: (task: Omit<Task, 'id'> & { column: ColumnType }) => void;
    onCancel: () => void;
    initialData?: Omit<Task, 'id'> & { column: ColumnType };
};

export default function AddTaskForm({ onSubmit, onCancel, initialData }: Props) {
    const [task, setTask] = useState<Omit<Task, 'id'> & { column: ColumnType }>(
        initialData || {
            title: '',
            description: '',
            priority: 'medium',
            column: 'todo'
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!task.title.trim()) return;
        onSubmit(task);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="font-bold mb-5">
                {initialData ? 'Edit Task' : 'Add New Task'}
            </h2>
            <form onSubmit={handleSubmit}>
                <label>Title *</label>
                <input
                    type="text"
                    placeholder="Task title" 
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <label>Description</label>
                <textarea
                    placeholder="Task description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    rows={2}
                />
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <div className="flex space-x-2">
                        {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
                            <button
                                key={priority}
                                type="button"
                                onClick={() => setTask({ ...task, priority })}
                                className={`px-3 py-1 rounded-md text-sm ${task.priority === priority
                                    ? priority === 'high'
                                        ? 'bg-red-500 text-white'
                                        : priority === 'medium'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-green-500 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-1 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        {initialData ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </form>
        </div>
    );
}