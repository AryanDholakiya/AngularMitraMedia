using Connectify_Api.Hubs;
using Connectify_Api.Repositories;
using Connectify_Api.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IGetChatHistoryAsync,GetChatHistory>();
builder.Services.AddScoped<EmailService>();

builder.Services.AddCors(options =>  //Added for signalr
{
    options.AddPolicy(name: "BuiltConnection",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

builder.Services.AddSignalR(); //Added for signalr

var app = builder.Build();

app.UseCors("BuiltConnection"); //Added for signalr

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatsHub>("/connectify"); //Added for signalr

app.Run();
