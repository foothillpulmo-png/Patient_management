import { CategorySidebar } from '../CategorySidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import type { CategoryType } from '../CategorySidebar';

export default function CategorySidebarExample() {
  const [category, setCategory] = useState<CategoryType>('tickets');

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <CategorySidebar
          selectedCategory={category}
          onCategoryChange={(cat) => {
            setCategory(cat);
            console.log('Category changed to:', cat);
          }}
          userName="Jessica Martinez"
          userRole="Patient Coordinator"
        />
      </div>
    </SidebarProvider>
  );
}
