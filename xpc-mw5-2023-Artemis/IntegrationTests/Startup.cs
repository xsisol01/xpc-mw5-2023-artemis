using Bogus;
using Microsoft.Extensions.DependencyInjection;

namespace IntegrationTests
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Add the necessary services for testing your API
            services.AddHttpClient(); // Example: Add HTTP client for API requests
            services.AddControllers(); // Example: Add MVC controllers

            var faker = new Faker();
            services.AddSingleton<Faker>(faker);
        }
    }
}
