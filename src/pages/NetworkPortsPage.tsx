import React, { useCallback, useMemo, useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { NetworkPort, networkPortsData } from '../data/networkPortsData';

const NetworkPortsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(networkPortsData.map((port) => port.category))
    );
    return ['all', ...uniqueCategories];
  }, []);

  // Get unique protocols
  const protocols = useMemo(() => {
    const uniqueProtocols = Array.from(
      new Set(networkPortsData.map((port) => port.protocol))
    );
    return ['all', ...uniqueProtocols];
  }, []);

  // Filter ports based on search query, selected category, and protocol
  const filteredPorts = useMemo(() => {
    if (
      !searchQuery.trim() &&
      selectedCategory === 'all' &&
      selectedProtocol === 'all'
    ) {
      return networkPortsData;
    }

    return networkPortsData.filter((port) => {
      // Filter by category if not "all"
      if (selectedCategory !== 'all' && port.category !== selectedCategory) {
        return false;
      }

      // Filter by protocol if not "all"
      if (selectedProtocol !== 'all' && port.protocol !== selectedProtocol) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          port.port.toString().includes(query) ||
          port.service.toLowerCase().includes(query) ||
          port.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedProtocol]);

  // Group filtered ports by category
  const filteredGroupedPorts = useMemo(() => {
    const groups: Record<string, NetworkPort[]> = {};

    filteredPorts.forEach((port) => {
      if (!groups[port.category]) {
        groups[port.category] = [];
      }
      groups[port.category].push(port);
    });

    return groups;
  }, [filteredPorts]);

  // Debounced search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // Category selection handler
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
    },
    []
  );

  // Protocol selection handler
  const handleProtocolChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedProtocol(e.target.value);
    },
    []
  );

  // Get background color based on protocol
  const getProtocolColor = (protocol: string): string => {
    if (protocol === 'TCP')
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    if (protocol === 'UDP')
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (protocol === 'TCP/UDP')
      return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Common Network Ports Reference
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of commonly used network ports, their
          protocols, and associated services. Use the search box to filter by
          port number, service name, or description.
        </p>
      </header>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by port, service, or description..."
              className="w-full pl-10 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="pl-10 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedProtocol}
                onChange={handleProtocolChange}
                className="pl-10 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              >
                {protocols.map((protocol) => (
                  <option key={protocol} value={protocol}>
                    {protocol === 'all' ? 'All Protocols' : protocol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredPorts.length} of {networkPortsData.length} network
          ports
        </div>
      </div>

      {/* Network Ports Display */}
      <div className="space-y-6">
        {Object.keys(filteredGroupedPorts).length === 0 ? (
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color text-center">
            No network ports found matching your criteria.
          </div>
        ) : (
          Object.entries(filteredGroupedPorts).map(([category, ports]) => (
            <div key={category} className="space-y-2">
              <h2 className="text-lg font-bold p-2 bg-gray-100 dark:bg-gray-800">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {ports.map((port) => (
                  <div
                    key={`${port.port}-${port.protocol}-${port.service}`}
                    className="p-3 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-lg w-16">
                          {port.port}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getProtocolColor(port.protocol)}`}
                        >
                          {port.protocol}
                        </span>
                        <span className="font-semibold">{port.service}</span>
                      </div>
                      <div className="md:ml-4 text-gray-700 dark:text-gray-300 flex-1">
                        {port.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* About Network Ports */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Network Ports
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            Network ports are virtual endpoints for communication in computer
            networking. They help route data to the correct application or
            service on a device.
          </p>
          <p>
            <strong>Port ranges:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Well-known ports (0-1023):</strong> Reserved for common
              services like HTTP (80), HTTPS (443), SSH (22)
            </li>
            <li>
              <strong>Registered ports (1024-49151):</strong> Registered with
              IANA but can be used by regular applications
            </li>
            <li>
              <strong>Dynamic/Private ports (49152-65535):</strong> Used for
              temporary connections and private services
            </li>
          </ul>
          <p>
            <strong>Transport protocols:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>TCP (Transmission Control Protocol):</strong>{' '}
              Connection-oriented, reliable, ordered delivery
            </li>
            <li>
              <strong>UDP (User Datagram Protocol):</strong> Connectionless,
              faster but less reliable
            </li>
          </ul>
          <p className="mt-2 text-xs">
            <em>
              Note: This reference lists commonly used default ports. Actual
              deployments may use different port numbers for security or
              configuration reasons.
            </em>
          </p>
        </div>
      </section>
    </div>
  );
};

export default NetworkPortsPage;
