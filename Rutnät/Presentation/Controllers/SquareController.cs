using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class SquareController : ControllerBase
    {
        private readonly ISquareRepository _squareRepository;
        public SquareController(ISquareRepository squareRepository)
        {
            _squareRepository = squareRepository;
        }

        [HttpPost]
        public async Task AddNewSquareNetAsync()
        {

            var user = User;
            var test = "";
        }
    }
}
