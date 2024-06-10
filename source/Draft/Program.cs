using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab5_T62
{
    internal class Program
    {
        //bai 5.1
        static void BT5_1()
        {
            DS_HP ds=new DS_HP();
            ds.NhapDS();
            ds.XuatDS();
        }
        //bai 5.2
        static void BT5_2()
        {
            DS_Xe ds=new DS_Xe();
            ds.NhapDS();
            ds.XuatDS();
            Console.WriteLine("So luong xe het han bao hanh {0}", ds.Dem());
        }
        //bai 5.3
        static void BT5_3()
        {
            DS_Ve ds=new DS_Ve ();
            ds.NhapDS();
            ds.XuatDS();
            Console.WriteLine("So luong ve co so km [a,b] {0}",ds.Dem());
            ds.Xoa();
            ds.XuatDS();
        }
        static void Main(string[] args)
        {
            BT5_3();
            Console.ReadKey();
        }
    }
}
