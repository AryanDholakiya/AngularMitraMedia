using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _1_Simple_Crud_Api_forNg_.Models
{
    [Table("Teachers")]
    public class Teacher
    {
        [Key]
        public int TeacherId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
