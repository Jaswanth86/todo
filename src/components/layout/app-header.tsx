'use client';
import { PenSquare, Link as LinkIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FilterControls } from '../kanban/filter-controls';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AppHeader() {
  return (
    <header className="flex flex-shrink-0 items-center justify-between p-4 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">Mobile App</h1>
        <Button variant="ghost" size="icon">
          <PenSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <LinkIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <FilterControls />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite
        </Button>
        <div className="flex -space-x-2 overflow-hidden">
            {PlaceHolderImages.slice(1, 5).map((img, index) => (
                <Image
                key={img.id}
                src={img.imageUrl}
                alt={img.description}
                width={32}
                height={32}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                data-ai-hint={img.imageHint}
                />
            ))}
        </div>
      </div>
    </header>
  );
}
