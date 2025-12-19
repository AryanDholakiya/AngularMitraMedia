using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace _1_Simple_Crud_Api_forNg_.Models
{
    public class StudentsContext : DbContext
    {
        public StudentsContext(DbContextOptions<StudentsContext> options) : base(options)
        {
            
        }
        public DbSet<Student> Students { get; set; }
    }
}
