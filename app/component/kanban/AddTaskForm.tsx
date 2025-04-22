import { Priority, Task, ColumnType } from '@/types/kanban';
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!task.title.trim()) return;
        onSubmit(task);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                </label>
                <input
                    type="text"
                    placeholder="Task title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    placeholder="Task description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                </label>
                <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
                        <button
                            key={priority}
                            type="button"
                            onClick={() => setTask({ ...task, priority })}
                            className={`flex-1 py-2 rounded-md text-sm font-medium ${task.priority === priority
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

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    {initialData ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}