﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Ombi.Api.Jellyfin.Models;

namespace Ombi.Api.Jellyfin
{
    public interface IJellyfinApi : IBaseJellyfinApi
    {      
        Task<JellyfinConnectUser> LoginConnectUser(string username, string password);
        Task<List<LibraryVirtualFolders>> GetLibraries(string apiKey, string baseUrl);
    }
}