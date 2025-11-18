import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreateMedicine, useUpdateMedicine } from '@/hooks/useMedicines';

const medicineSchema = z.object({
  name: z.string().min(3, 'Nama obat minimal 3 karakter'),
  dosage: z.string().min(2, 'Dosis harus diisi'),
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
  stock: z.coerce.number().min(0, 'Stok tidak boleh negatif'),
});

type MedicineFormData = z.infer<typeof medicineSchema>;

interface MedicineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine?: any;
}

export const MedicineFormDialog = ({ open, onOpenChange, medicine }: MedicineFormDialogProps) => {
  const createMedicine = useCreateMedicine();
  const updateMedicine = useUpdateMedicine();

  const form = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: medicine ? {
      name: medicine.name,
      dosage: medicine.dosage,
      category: medicine.category || '',
      description: medicine.description || '',
      price: medicine.price,
      stock: medicine.stock,
    } : {
      name: '',
      dosage: '',
      category: '',
      description: '',
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = async (data: MedicineFormData) => {
    const payload = {
      ...data,
      category: data.category || null,
      description: data.description || null,
    };

    if (medicine) {
      await updateMedicine.mutateAsync({ id: medicine.id, ...payload });
    } else {
      await createMedicine.mutateAsync(payload);
    }
    
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{medicine ? 'Edit Obat' : 'Tambah Obat Baru'}</DialogTitle>
          <DialogDescription>
            {medicine ? 'Update data obat' : 'Masukkan data obat baru'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Obat *</FormLabel>
                    <FormControl>
                      <Input placeholder="Paracetamol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosis *</FormLabel>
                    <FormControl>
                      <Input placeholder="500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Input placeholder="Analgesik" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (Rp) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi obat dan kegunaannya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={createMedicine.isPending || updateMedicine.isPending}>
                {medicine ? 'Update' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
