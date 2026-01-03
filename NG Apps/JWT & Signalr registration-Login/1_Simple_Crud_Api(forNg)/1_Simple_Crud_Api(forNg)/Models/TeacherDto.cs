using System.ComponentModel.DataAnnotations;

namespace _1_Simple_Crud_Api_forNg_.Models
{
    public class TeacherDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
