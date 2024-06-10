using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab5_T62
{
    internal class VeXeBus
    {
        protected byte tuyen;
        static int giasan = 5000;
        protected string doituong;

        public byte Tuyen { get => tuyen; set => tuyen = value; }

        //khoi tao
        public VeXeBus (byte t=1, string dt="sinh vien")
        {            
            tuyen = t;doituong = dt;
        }
        //nhap
        public virtual void Nhap()
        {
            Console.Write("Nhap tuyen xe (1,2..):");
            while (!byte.TryParse(Console.ReadLine(), out tuyen))
                Console.Write("Nhap lai tuyen xe (1,2..)");
            Console.Write("Nhap doi tuong:");
            doituong= Console.ReadLine();
        }
        //xuat
        public virtual void Xuat()
        {
            Console.Write($"{tuyen}\t{doituong}");
        }
        //tinh gia ve
        public virtual float TinhGiaVe()
        {
            string s=doituong.ToLower();
            if (string.Compare(s, "sinh vien") == 0 || string.Compare(s, "hoc sinh") == 0)
                return giasan;
            else
                return giasan * 1.2f;
        }
    }
    //tu dinh nghia interface
    interface IMuaVeThang
    {
        byte Sothang { get; set; }//khai bao thuoc tinh
        float TinhTienGiam();//khai bao phuong thuc
    }
    //lop dan xuat, thu thi interface
    class XeBusLH:VeXeBus, IMuaVeThang
    {
        byte thang;
        float sokm;
        public byte Sothang { get => thang; set => thang = value; }
        public float Sokm { get => sokm; set => sokm = value; }

        //khoi tao
        public XeBusLH(byte t = 1, string dt = "sinh vien",byte thang=1,float km=5):base(t,dt)
        {
            this.thang = thang;sokm = km;
        }
        //nhap
        public override void Nhap()
        {
            base.Nhap();
            Console.Write("Nhap so thang (1,2..):");
            while (!byte.TryParse(Console.ReadLine(), out thang)||thang<0)
                Console.Write("Nhap lai so thang (1,2..)");
            Console.Write("Nhap so km:");
            while (!float.TryParse(Console.ReadLine(), out sokm)|sokm<0)
                Console.Write("Nhap lai so km:");
        }
        //xuat
        public override void Xuat()
        {
            base.Xuat();
            Console.WriteLine($"\t{thang}\t{sokm}\t{TinhGiaVe()}");
        }
        //tinh tien giam
        public float TinhTienGiam()
        {
            if (thang >= 3 && sokm >= 20)
                return 0.15f * base.TinhGiaVe();
            else
                return 0.1f * base.TinhGiaVe();
        }
        //tinh gia ve xe bú lien huyen
        public override float TinhGiaVe()
        {
            return base.TinhGiaVe() - TinhTienGiam();
        }
    }
    //danh sach
    class DS_Ve
    {
        int n;
        List<XeBusLH> ds;
        //nhap danh sach
        public void NhapDS()
        {
            Console.Write("Nhap so luong ve xe bus lien huyen:");
            while (!int.TryParse(Console.ReadLine(), out n) || n <= 3 || n >= 50)
                Console.Write("Nhap lai so luong ve xe bus lien huyen:");
            //khoi tao danh sach
            ds=new List<XeBusLH> (n);
            for(int i = 0; i < n; i++)
            {
                Console.Write("Nhap thong tin doi tuong thu {0}:", i + 1);
                XeBusLH ve=new XeBusLH();
                ve.Nhap();
                ds.Add(ve);
            }            
        }
        //xuat danh sach
        public void XuatDS()
        {
            foreach (XeBusLH ve in ds)
                ve.Xuat();
        }
        //dem so luong ve a<= sokm <= b
        public int Dem()
        {
            float a, b;
            Console.Write("Nhap so km [a,b], a:");
            while (!float.TryParse(Console.ReadLine(), out a) || a<0)
                Console.Write("Nhap lai so km [a,b], a:");
            Console.Write("Nhap so km [a,b], b:");
            while (!float.TryParse(Console.ReadLine(), out b) || b < a)
                Console.Write("Nhap lai so km [a,b], b:");
            //dem
            int c = 0;
            foreach (XeBusLH ve in ds)
                if (ve.Sokm >= a && ve.Sokm <= b)//dong doi thuoc tinh sokm
                    c++;
            return c;
        }
        //xoa tat ca ve co tuyen =1
        public void Xoa()
        {
            ds.RemoveAll(x => x.Tuyen == 1);
        }
    }
}
