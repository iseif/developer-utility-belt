import React, { useState, useEffect } from 'react';

interface IpData {
  ip: string;
}

interface GeoData {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

const IpInfoPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [customIp, setCustomIp] = useState<string>('');
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [geoError, setGeoError] = useState<string>('');

  // Fetch the user's IP address on component mount
  useEffect(() => {
    fetchIpAddress();
  }, []);

  const fetchIpAddress = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: IpData = await response.json();
      setIpAddress(data.ip);
      
      // Optionally fetch geolocation data for the user's IP
      fetchGeoData(data.ip);
    } catch (err) {
      setError(`Failed to fetch IP address: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeoData = async (ip: string) => {
    setGeoLoading(true);
    setGeoError('');
    
    try {
      // Using ipapi.co which provides a free tier with reasonable limits
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if the API returned an error
      if (data.error) {
        throw new Error(data.reason || 'API returned an error');
      }
      
      setGeoData({
        ip: data.ip,
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      });
    } catch (err) {
      setGeoError(`Failed to fetch geolocation data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setGeoData(null);
    } finally {
      setGeoLoading(false);
    }
  };

  const handleCustomLookup = () => {
    if (!customIp.trim()) {
      setGeoError('Please enter an IP address');
      return;
    }
    
    // Simple IP validation regex
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipRegex.test(customIp.trim())) {
      setGeoError('Please enter a valid IPv4 address');
      return;
    }
    
    fetchGeoData(customIp.trim());
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          IP Address Information
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          View your current public IP address and approximate geolocation information.
          <span className="block mt-1 text-sm italic">
            Note: Geolocation data is provided by a third-party service and may not be 100% accurate.
          </span>
        </p>
      </header>

      {error && (
        <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700 text-red-700 dark:text-red-100">
          {error}
        </div>
      )}

      <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
          Your Public IP Address
        </h3>
        
        {loading ? (
          <div className="py-4 text-center text-gray-600 dark:text-gray-400">
            Loading your IP address...
          </div>
        ) : (
          <div className="py-2">
            <div className="font-mono text-xl text-center p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700">
              {ipAddress}
            </div>
            <div className="mt-2 flex justify-center">
              <button
                onClick={fetchIpAddress}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
          IP Lookup
        </h3>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter an IP address to lookup its geolocation information:
          </p>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={customIp}
              onChange={(e) => setCustomIp(e.target.value)}
              placeholder="e.g., 8.8.8.8"
              className="flex-1 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text"
            />
            <button
              onClick={handleCustomLookup}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
            >
              Lookup
            </button>
          </div>
        </div>
      </section>

      {geoError && (
        <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700 text-red-700 dark:text-red-100">
          {geoError}
        </div>
      )}

      {geoLoading && (
        <div className="p-4 text-center text-gray-600 dark:text-gray-400 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          Loading geolocation data...
        </div>
      )}

      {geoData && !geoLoading && (
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Geolocation Information for {geoData.ip}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700">
              <span className="font-semibold">Location: </span>
              {geoData.city && geoData.region && geoData.country_name ? (
                <span>{geoData.city}, {geoData.region}, {geoData.country_name}</span>
              ) : (
                <span className="text-gray-500 italic">Location data unavailable</span>
              )}
            </div>
            
            <div className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700">
              <span className="font-semibold">Timezone: </span>
              {geoData.timezone ? (
                <span>{geoData.timezone}</span>
              ) : (
                <span className="text-gray-500 italic">Timezone data unavailable</span>
              )}
            </div>
            
            <div className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700">
              <span className="font-semibold">Coordinates: </span>
              {geoData.latitude && geoData.longitude ? (
                <span className="font-mono">{geoData.latitude.toFixed(4)}, {geoData.longitude.toFixed(4)}</span>
              ) : (
                <span className="text-gray-500 italic">Coordinate data unavailable</span>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About IP Addresses
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>IP Address</strong> (Internet Protocol Address) is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.
          </p>
          <p>
            <strong>Public vs. Private IP:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Public IP</strong> - Assigned by your ISP and visible to the internet</li>
            <li><strong>Private IP</strong> - Used within local networks (e.g., 192.168.x.x, 10.x.x.x)</li>
          </ul>
          <p className="mt-2">
            <strong>Geolocation Accuracy:</strong>
          </p>
          <p>
            IP-based geolocation provides an approximation of physical location based on IP address registration data. It is typically accurate to the city level but can sometimes be off by significant distances. The data shown here is provided by a third-party service and should not be relied upon for critical applications.
          </p>
        </div>
      </section>
    </div>
  );
};

export default IpInfoPage;
