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
import { Button } from '../ui/button';
import { Calendar, SlidersHorizontal } from 'lucide-react';

const categories: ('all' | Category)[] = ['all', 'Brainstorming', 'Research', 'Wireframes', 'Design System'];
const priorities: ('all' | Priority)[] = ['all', 'Low', 'Medium', 'High'];

export function FilterControls() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={filters.category}
        onValueChange={(value: 'all' | Category) => dispatch(setCategoryFilter(value))}
      >
        <SelectTrigger className="w-auto gap-2 bg-transparent">
          <SlidersHorizontal className='h-4 w-4'/>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.filter(c => c !== 'all').map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Calendar className='h-4 w-4' />
        Today
      </Button>
    </div>
  );
}
