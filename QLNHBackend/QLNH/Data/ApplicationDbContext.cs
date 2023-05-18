using Microsoft.EntityFrameworkCore;
using QLNH.Models;
using QLNH_APIs.Models;//dòng này là đã import hết các Models
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLNH_APIs.Data
{

    public class ApplicationDbContext : DbContext
    {
        public DbSet<Item> Item { get; set; }
        public DbSet<Guest> Guest { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Put> Put { get; set; }

        public DbSet<Bill> Bill { get; set; }


        //public DbSet<Status> Statuses { get; set; }
        //public DbSet<Restaurant> Restaurants { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
