'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addTask } from '@/lib/redux/tasks-slice';
import { Category, Priority, Status, Task } from '@/lib/types';
import { smartTaskSuggestion } from '@/ai/flows/smart-task-suggestion';
import { useToast } from '@/hooks/use-toast';

const categories: Category[] = ['Work', 'Personal', 'Urgent'];
const priorities: Priority[] = ['Low', 'Medium', 'High'];
const statuses: Status[] = ['todo', 'inprogress', 'done'];

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(categories),
  priority: z.enum(priorities),
  status: z.enum(statuses),
});

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      status: 'todo',
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    const newTask: Task = {
      ...values,
      id: `task-${Date.now()}`,
    };
    dispatch(addTask(newTask));
    form.reset();
    setOpen(false);
    toast({
      title: "Task Created",
      description: `"${values.title}" has been added to your board.`,
    });
  };

  const handleGetSuggestion = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Description needed',
        description: 'Please enter a description to get AI suggestions.',
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await smartTaskSuggestion({ description });
      if (result.categorySuggestion && categories.includes(result.categorySuggestion as Category)) {
        form.setValue('category', result.categorySuggestion as Category);
      }
      if (result.prioritySuggestion && priorities.includes(result.prioritySuggestion as Priority)) {
        form.setValue('priority', result.prioritySuggestion as Priority);
      }
      toast({
        title: 'Suggestions Applied',
        description: 'AI suggestions have been applied to the form.',
      });
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not fetch suggestions. Please try again.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Design the homepage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea placeholder="Add more details about the task..." {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute bottom-1 right-1 h-7 w-7 text-accent hover:text-accent"
                      onClick={handleGetSuggestion}
                      disabled={isSuggesting}
                      aria-label="Get AI Suggestions"
                    >
                      {isSuggesting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map(prio => <SelectItem key={prio} value={prio}>{prio}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map(st => <SelectItem key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
