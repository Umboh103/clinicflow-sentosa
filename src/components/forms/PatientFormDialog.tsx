import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreatePatient, useUpdatePatient } from '@/hooks/usePatients';

const patientSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  age: z.coerce.number().min(1, 'Umur harus lebih dari 0').max(150, 'Umur tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  complaint: z.string().min(5, 'Keluhan minimal 5 karakter'),
  ktp: z.string().optional(),
  bpjs: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: any;
}

export const PatientFormDialog = ({ open, onOpenChange, patient }: PatientFormDialogProps) => {
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient ? {
      name: patient.name,
      age: patient.age,
      phone: patient.phone,
      email: patient.email || '',
      address: patient.address,
      complaint: patient.complaint,
      ktp: patient.ktp || '',
      bpjs: patient.bpjs || '',
    } : {
      name: '',
      age: 0,
      phone: '',
      email: '',
      address: '',
      complaint: '',
      ktp: '',
      bpjs: '',
    },
  });

  const onSubmit = async (data: PatientFormData) => {
    const payload = {
      ...data,
      email: data.email || null,
      ktp: data.ktp || null,
      bpjs: data.bpjs || null,
    };

    if (patient) {
      await updatePatient.mutateAsync({ id: patient.id, ...payload });
    } else {
      await createPatient.mutateAsync(payload);
    }
    
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{patient ? 'Edit Pasien' : 'Tambah Pasien Baru'}</DialogTitle>
          <DialogDescription>
            {patient ? 'Update data pasien' : 'Masukkan data pasien baru'}
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
                    <FormLabel>Nama Lengkap *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon *</FormLabel>
                    <FormControl>
                      <Input placeholder="081234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ktp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. KTP</FormLabel>
                    <FormControl>
                      <Input placeholder="3201234567890123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bpjs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. BPJS</FormLabel>
                    <FormControl>
                      <Input placeholder="0001234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Alamat lengkap pasien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complaint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keluhan *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Keluhan atau gejala yang dialami" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={createPatient.isPending || updatePatient.isPending}>
                {patient ? 'Update' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
