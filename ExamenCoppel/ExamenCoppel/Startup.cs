using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExamenCoppel.Startup))]
namespace ExamenCoppel
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
