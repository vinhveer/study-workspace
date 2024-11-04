using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace BaiTap6_64132989.Models
{
    public partial class QLNV_64132989DbContext : DbContext
    {
        public QLNV_64132989DbContext()
            : base("name=QLNV_64132989DbContext")
        {
        }

        public virtual DbSet<NhanVien> NhanViens { get; set; }
        public virtual DbSet<PhongBan> PhongBans { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
