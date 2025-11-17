import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          patients (id, name)
        `)
        .order('payment_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payment: any) => {
      const { data, error } = await supabase
        .from('payments')
        .insert([payment])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Pembayaran berhasil ditambahkan');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menambahkan pembayaran');
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...payment }: any) => {
      const { data, error } = await supabase
        .from('payments')
        .update(payment)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Pembayaran berhasil diupdate');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Gagal mengupdate pembayaran');
    },
  });
};
