using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _1_Simple_Crud_Api_forNg_.Models
{

    [Table("Student")]
    public class Student
    {
        [Key]
        public int GrNumber { get; set; }

        public string? Sname { get; set; }

        public string? Sgender { get; set; }

        public int? Sage { get; set; }

        public int? Sstd { get; set; }

        public string? Sphoto { get; set; }
    }
}
