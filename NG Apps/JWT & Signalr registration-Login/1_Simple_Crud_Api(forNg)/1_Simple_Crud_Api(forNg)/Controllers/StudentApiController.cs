using _1_Simple_Crud_Api_forNg_.Hubs;
using _1_Simple_Crud_Api_forNg_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace _1_Simple_Crud_Api_forNg_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentApiController : ControllerBase
    {
        private readonly StudentsContext _context;
        private readonly IHubContext<StudentHub> _hub;

        public StudentApiController(StudentsContext context, IHubContext<StudentHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        [Route("AllStudents")]
        //without Route url be like: "https://localhost:7006/api/StudentApi"
        //with route "[Route("AllStudents")]" url be like: "https://localhost:7006/api/StudentApi/AllStudents"
        public async Task<IActionResult> GetStudents()
        {
            var allStudents = await _context.Students.ToListAsync();
            return Ok(allStudents);
        }


        [HttpGet]
        [Route("student/{id}")] //spcific id no student get krva mate
        public async Task<IActionResult> GetStudent(int id)
        {
            if (id != 0)
            {
                var SpecificStudent = await _context.Students.FindAsync(id);
                if (SpecificStudent == null)
                {
                    return NotFound();
                }
                return Ok(SpecificStudent);
            }
            return BadRequest("invalid id!");
        }

        [HttpPost] //Note here we don't have to create the get method for : Create
        //further crud operations ma e khali view kholva mate get method vaprta.
        [Route("Add_Student")]
        public async Task<IActionResult> AddStudent(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("StudentChanged", student);

            return Ok(student);
        }


        [HttpPut]
        [Route("Edit_Student/{id}")]
        public async Task<IActionResult> EditStudent(int id, Student student) //ahi Student student na "student" ma updated thyela student no data aavse.
        {
            if (id != student.GrNumber)
            {
                return BadRequest();
            }
            _context.Entry(student).State = EntityState.Modified;
            //jo upper ni line no krie to bou lambu pde look method 2:
            //var updated_Student = _context.Students.Find(student.GrNumber);
            //updated_Student.Sname = student.Sname;
            //updated_Student.Sstd = student.Sstd;
            //updated_Student.Sage = student.Sage;
            //updated_Student.Sgender = student.Sgender;
            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("StudentChanged",student);

            return Ok(student);
        }


        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var find_student = await _context.Students.FindAsync(id);
            if (find_student == null)
            {
                return NotFound("No student found!");
            }
            _context.Students.Remove(find_student);
            await _context.SaveChangesAsync();

            await _hub.Clients.All.SendAsync("Studentdeleted",id);

            return Ok("Student Removed!");
        }
    }
}
