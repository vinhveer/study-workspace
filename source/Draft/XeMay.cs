using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab5_T62
{
    abstract internal class XeMay
    {
        protected  string bienso;
        protected int namdk;
        //khoi tao
        public XeMay(string bienso="79.N1-123.45", int namdk=2020)
        {
            this.bienso = bienso;this.namdk = namdk;
        }
        //nhap
        public virtual void Nhap()
        {
            Console.Write("Nhap bien so xe:");
            bienso=Console.ReadLine();
            Console.Write("Nhap nam dang ky:");
            while(!int.TryParse(Console.ReadLine(), out namdk))
                Console.Write("Nhap lai nam dang ky:");
        }
        //xuat
        public void Xuat()
        {
            Console.WriteLine($"{bienso}\t{namdk}\t{TinhBaoHanh()}");
        }
        //tinh thoi han bao hanh
        public abstract int TinhBaoHanh();
    }
    //lop dan xuat
    class XeDien : XeMay
    {
        float dungluongpin;
        //khoi tao
        public XeDien(string bienso = "79.MĐ-123.45", int namdk = 2020, float pin=22.2f):base(bienso, namdk)
        {
            dungluongpin = pin;
        }
        //nhap: co che da hinh
        public override void Nhap()
        {
            base.Nhap();
            Console.Write("Nhap dung luong pin:");
            while (!float.TryParse(Console.ReadLine(), out dungluongpin)||dungluongpin<0)
                Console.Write("Nhap lai dung luong pin:");
        }
        //tinh han bao hanh
        public override int TinhBaoHanh()
        {
            return namdk + 3;
        }
    }
    //
    class XeXang : XeMay
    {
        float dungtich;
        //khoi tao
        public XeXang(string bienso = "79.N1-123.45", int namdk = 2020, float dt = 6) : base(bienso, namdk)
        {
            dungtich = dt;
        }
        //nhap: co che da hinh
        public override void Nhap()
        {
            base.Nhap();
            Console.Write("Nhap dung tich binh xang:");
            while (!float.TryParse(Console.ReadLine(), out dungtich) || dungtich < 0)
                Console.Write("Nhap lai dung tich binh xang:");
        }
        //tinh han bao hanh
        public override int TinhBaoHanh()
        {
            return namdk + 2;
        }
    }
    //danh sach
    class DS_Xe
    {
        int n;
        List<XeMay> ds;
        //nhap danh sach
        public void NhapDS()
        {
            Console.Write("Nhap so luong xe may:");
            while (!int.TryParse(Console.ReadLine(), out n)||n<=1 ||n>=20)
                Console.Write("Nhap lai so luong xe may:");
            //khoi tao danh sach
            ds = new List<XeMay>(n);
            //nhap danh sach xe may
            for(int i = 0; i < n; i++)
            {
                byte chon;//1.Xe may dien
                Console.Write("Nhap doi tuong thu {0} la xe may loai (1.Xe dien):",i+1);
                while (!byte.TryParse(Console.ReadLine(), out chon) )
                    Console.Write("Nhap lai doi tuong thu {0} la xe may loai (1.Xe dien):", i + 1);
                XeMay xe;
                if (chon == 1)
                    xe = new XeDien();
                else
                    xe = new XeXang();
                xe.Nhap();
                ds.Add(xe);
            }
        }
        //xuat danh sach
        public void XuatDS()
        {
            foreach (var xe in ds)
                xe.Xuat();
        }
        //dem so luong xe het han bao hanh
        public int Dem()
        {
            int c = 0;
            foreach (var xe in ds)
                if (xe.TinhBaoHanh() < DateTime.Today.Year)
                    c++;
            return c;
        }
    }
}
