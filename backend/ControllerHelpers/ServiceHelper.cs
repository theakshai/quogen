using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.ControllerHelpers
{
    public class ServiceHelper
    {

        public async Task<bool> ServiceExist(string? serviceName ,ApplicationDbContext _context)
        {
            if(serviceName is not null)
            {
                try
                {
                   var Service = await _context.Services.FirstOrDefaultAsync(s => s.ServiceName == serviceName);                        
                   if(Service is not null)
                    {
                        return true;
                    }
                }catch(Exception ex)
                {
                    return false;
                }

            }
            return false;
        }
        public async Task<bool> ServiceExistById(string? id,ApplicationDbContext _context)
        {
            if(id is not null)
            {
                try
                {
                   var Service = await _context.Services.FirstOrDefaultAsync(s => s.ServiceId == id);                        
                   if(Service is not null)
                    {
                        return true;
                    }
                }catch(Exception ex)
                {
                    return false;
                }

            }
            return false;
        }
    }
}
