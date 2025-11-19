import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DemoAccount {
  email: string
  password: string
  name: string
  role: 'admin' | 'doctor' | 'pharmacist' | 'owner' | 'patient'
  phone?: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const demoAccounts: DemoAccount[] = [
      {
        email: 'admin@sentosa.com',
        password: 'password123',
        name: 'Admin Klinik',
        role: 'admin',
        phone: '081234567890'
      },
      {
        email: 'dokter@sentosa.com',
        password: 'password123',
        name: 'Dr. Sarah Johnson',
        role: 'doctor',
        phone: '081234567891'
      },
      {
        email: 'apoteker@sentosa.com',
        password: 'password123',
        name: 'Michael Chen',
        role: 'pharmacist',
        phone: '081234567892'
      },
      {
        email: 'pemilik@sentosa.com',
        password: 'password123',
        name: 'Owner Klinik',
        role: 'owner',
        phone: '081234567893'
      }
    ]

    const results = []

    for (const account of demoAccounts) {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
      const userExists = existingUser?.users.some(u => u.email === account.email)

      if (userExists) {
        results.push({
          email: account.email,
          status: 'already_exists',
          message: 'User already exists'
        })
        continue
      }

      // Create user
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          name: account.name,
          phone: account.phone
        }
      })

      if (userError) {
        results.push({
          email: account.email,
          status: 'error',
          message: userError.message
        })
        continue
      }

      // Set user role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userData.user.id,
          role: account.role
        })

      if (roleError) {
        results.push({
          email: account.email,
          status: 'partial_success',
          message: 'User created but role assignment failed: ' + roleError.message
        })
        continue
      }

      results.push({
        email: account.email,
        status: 'success',
        message: 'Account created successfully',
        role: account.role
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
