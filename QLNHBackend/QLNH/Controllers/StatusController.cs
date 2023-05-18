using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QLNH_APIs.Data;
using QLNH_APIs.Models;

namespace QLNH_APIs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Status> Get()
        {
            return _context.Status.ToList();
        }
        [HttpPost]
        public Status Post([FromBody] Status Status)
        {
            _context.Status.Add(Status);
            _context.SaveChanges();
            return Status;
        }

        [HttpPut]
        public Status Put([FromBody] Status Status)
        {
            var status = _context.Status.Find(Status.Id);
            if (status == null)
            {
                return null;
            }
            status.Name = Status.Name;
            status.Description = Status.Description;
            status.Deleted = Status.Deleted;
            status.GuestId = Status.GuestId;
            _context.SaveChanges();
            return status;
        }
    }
}

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using QLNH_APIs.Data;
//using QLNH_APIs.Models;

//namespace QLNH_APIs.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class StatusController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        public StatusController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public IEnumerable<Status> Get()
//        {
//            return _context.Status.ToList();
//        }
//        [HttpPost]
//        public Status Post([FromBody] Status Status)
//        {
//            //var createdUser = _context.User.Find(Status.UpdatedUser.Id);
//            //Status.CreatedUser = createdUser;
//            //var updatedUser = _context.Users.Find(Status.UpdatedUser.Id);
//            //Status.UpdatedUser = updatedUser;
//            _context.Status.Add(Status);
//            _context.SaveChanges();
//            return Status;
//        }

//        [HttpPut]
//        public Status Put([FromBody] Status Status)
//        {
//            var status = _context.Status.Find(Status.Id);
//            if (status == null)
//            {
//                return null;
//            }
//            status.Name = Status.Name;
//            status.Description = Status.Description;
//            status.Deleted = Status.Deleted;
//            _context.SaveChanges();
//            return status;
//        }
//    }
//}
