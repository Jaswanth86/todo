'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryFilter,
  setPriorityFilter,
  selectFilters,
} from '@/lib/redux/tasks-slice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category, Priority } from '@/lib/types';

const categories: ('all' | Category)[] = ['all', 'Work', 'Personal', 'Urgent'];
const priorities: ('all' | Priority)[] = ['all', 'Low', 'Medium', 'High'];

export function FilterControls() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className="flex items-center gap-4">
      <Select
        value={filters.category}
        onValueChange={(value: 'all' | Category) => dispatch(setCategoryFilter(value))}
      >
        <SelectTrigger className="w-[150px] bg-background">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(value: 'all' | Priority) => dispatch(setPriorityFilter(value))}
      >
        <SelectTrigger className="w-[150px] bg-background">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((prio) => (
            <SelectItem key={prio} value={prio}>
              {prio === 'all' ? 'All Priorities' : prio}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
