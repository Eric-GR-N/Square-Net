using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class SquareNetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SquareDto> Squares { get; set; } = new List<SquareDto>();
        public Guid? ApplicationUserId { get; set; }
    }
}
