
import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
}

const CategoryManager = ({ categories, onAddCategory, onDeleteCategory }: CategoryManagerProps) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory) {
      onAddCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="newCategory">Nome da Categoria</Label>
              <Input 
                id="newCategory" 
                placeholder="Digite o nome da categoria" 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
              />
            </div>
            <Button onClick={handleAddCategory}>
              <Plus size={16} className="mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Categorias Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 border rounded-md"
              >
                <span>{category}</span>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDeleteCategory(category)}
                  disabled={category === 'Todos'}
                >
                  <Trash size={14} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManager;
