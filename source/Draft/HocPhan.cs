using System;
using System.Collections.Generic;
using System.IO;


namespace Lab5_T62
{
    internal class HocPhan
    {
        string maHP, tenHP;
        byte soTC;
        //khoi tao
        public HocPhan(string maHP="SOT315", string tenHP="NMLT",byte soTC=3)
        {
            this.maHP = maHP;this.tenHP = tenHP;this.soTC = soTC;
        }
        //xuat su dung ToString()
        public override string ToString()
        {
            return maHP+"\t"+tenHP+"\t"+soTC;
        }
    }
    //danh sach n hoc phan
    class DS_HP
    {
        int n;
        List<HocPhan> ds;
        //nhap danh sach
        public void NhapDS()
        {
            try
            {
                FileStream f = new FileStream(@"D:\OOP\hocphan.txt", FileMode.Open);
                StreamReader sr = new StreamReader(f);
                n = int.Parse(sr.ReadLine());//doc dong dau tien trong file, chuyen doi kieu va gan cho n
                //khoi tao danh sach
                ds = new List<HocPhan>(n);
                //doc tung dong du lieu trong file => tao doi tuong HocPhan, add doi tuong vao danh sach
                for (int i = 0; i < n; i++)
                {
                    string s = sr.ReadLine();//doc dong du lieu dua vao s
                    string[] tt = s.Split(';');//cat tung thanh phan tren dong du lieu qua ;
                    HocPhan hp = new HocPhan(tt[0], tt[1], byte.Parse(tt[2]));
                    ds.Add(hp);
                }
            }catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }            
        }
        //xuat danh sach
        public void XuatDS()
        {
            foreach(HocPhan hp in ds)
                Console.WriteLine(hp.ToString());
        }
    }
}
