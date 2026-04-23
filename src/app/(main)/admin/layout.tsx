'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getMe from '@/libs/getMe';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // middleware จัดการ redirect ไป /login แล้วถ้าไม่มี token
    // layout นี้เช็คเฉพาะ role admin เท่านั้น
    const token = localStorage.getItem('jf_token');
    if (!token) { router.replace('/login'); return; }

    getMe(token)
      .then(({ data }) => {
        if (data.role !== 'admin') {
          router.replace('/dashboard');
        } else {
          setReady(true);
        }
      })
      .catch(() => {
        // token หมดอายุ — ล้าง cookie ด้วย
        document.cookie = 'jf_token=; path=/; max-age=0; SameSite=Lax';
        localStorage.removeItem('jf_token');
        localStorage.removeItem('jf_user');
        router.replace('/login');
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: 120 }}>
        <p style={{ color: 'var(--muted)' }}>Checking permissions…</p>
      </div>
    );
  }

  return <>{children}</>;
}
