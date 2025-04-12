// Network Ports data structure
export interface NetworkPort {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  description: string;
  category: string;
}

export const networkPortsData: NetworkPort[] = [
  // Web Services
  {
    port: 80,
    protocol: 'TCP',
    service: 'HTTP',
    description: 'Hypertext Transfer Protocol - used for unsecured web browsing',
    category: 'Web Services',
  },
  {
    port: 443,
    protocol: 'TCP',
    service: 'HTTPS',
    description: 'HTTP Secure - encrypted version of HTTP using TLS/SSL',
    category: 'Web Services',
  },
  {
    port: 8080,
    protocol: 'TCP',
    service: 'HTTP Alternate',
    description: 'Alternative port for HTTP, commonly used for web proxies and development servers',
    category: 'Web Services',
  },
  {
    port: 8443,
    protocol: 'TCP',
    service: 'HTTPS Alternate',
    description: 'Alternative port for HTTPS, commonly used for development servers',
    category: 'Web Services',
  },

  // Email Services
  {
    port: 25,
    protocol: 'TCP',
    service: 'SMTP',
    description: 'Simple Mail Transfer Protocol - used for sending emails',
    category: 'Email Services',
  },
  {
    port: 465,
    protocol: 'TCP',
    service: 'SMTPS',
    description: 'SMTP over SSL - secure version of SMTP',
    category: 'Email Services',
  },
  {
    port: 587,
    protocol: 'TCP',
    service: 'SMTP Submission',
    description: 'SMTP port used for email client submission with STARTTLS support',
    category: 'Email Services',
  },
  {
    port: 110,
    protocol: 'TCP',
    service: 'POP3',
    description: 'Post Office Protocol v3 - used for retrieving emails from a server',
    category: 'Email Services',
  },
  {
    port: 995,
    protocol: 'TCP',
    service: 'POP3S',
    description: 'POP3 over SSL - secure version of POP3',
    category: 'Email Services',
  },
  {
    port: 143,
    protocol: 'TCP',
    service: 'IMAP',
    description: 'Internet Message Access Protocol - used for retrieving emails with more features than POP3',
    category: 'Email Services',
  },
  {
    port: 993,
    protocol: 'TCP',
    service: 'IMAPS',
    description: 'IMAP over SSL - secure version of IMAP',
    category: 'Email Services',
  },

  // File Transfer
  {
    port: 20,
    protocol: 'TCP',
    service: 'FTP Data',
    description: 'File Transfer Protocol data transfer',
    category: 'File Transfer',
  },
  {
    port: 21,
    protocol: 'TCP',
    service: 'FTP Control',
    description: 'File Transfer Protocol command control',
    category: 'File Transfer',
  },
  {
    port: 22,
    protocol: 'TCP',
    service: 'SFTP/SSH',
    description: 'Secure Shell / Secure File Transfer Protocol',
    category: 'File Transfer',
  },
  {
    port: 989,
    protocol: 'TCP',
    service: 'FTPS Data',
    description: 'FTP over SSL data transfer',
    category: 'File Transfer',
  },
  {
    port: 990,
    protocol: 'TCP',
    service: 'FTPS Control',
    description: 'FTP over SSL command control',
    category: 'File Transfer',
  },
  {
    port: 115,
    protocol: 'TCP',
    service: 'SFTP (Legacy)',
    description: 'Simple File Transfer Protocol (legacy, not SSH File Transfer Protocol)',
    category: 'File Transfer',
  },
  {
    port: 139,
    protocol: 'TCP',
    service: 'SMB/NetBIOS',
    description: 'Server Message Block over NetBIOS',
    category: 'File Transfer',
  },
  {
    port: 445,
    protocol: 'TCP',
    service: 'SMB/CIFS',
    description: 'Server Message Block / Common Internet File System',
    category: 'File Transfer',
  },

  // Remote Access
  {
    port: 22,
    protocol: 'TCP',
    service: 'SSH',
    description: 'Secure Shell - encrypted remote login and command execution',
    category: 'Remote Access',
  },
  {
    port: 23,
    protocol: 'TCP',
    service: 'Telnet',
    description: 'Unencrypted text communications and terminal emulation (insecure)',
    category: 'Remote Access',
  },
  {
    port: 3389,
    protocol: 'TCP',
    service: 'RDP',
    description: 'Remote Desktop Protocol - used for Windows remote desktop',
    category: 'Remote Access',
  },
  {
    port: 5900,
    protocol: 'TCP',
    service: 'VNC',
    description: 'Virtual Network Computing - remote desktop sharing',
    category: 'Remote Access',
  },

  // DNS Services
  {
    port: 53,
    protocol: 'TCP/UDP',
    service: 'DNS',
    description: 'Domain Name System - translates domain names to IP addresses',
    category: 'DNS Services',
  },
  {
    port: 853,
    protocol: 'TCP',
    service: 'DNS over TLS',
    description: 'Secure DNS using TLS encryption',
    category: 'DNS Services',
  },

  // Database Services
  {
    port: 1433,
    protocol: 'TCP',
    service: 'MS SQL',
    description: 'Microsoft SQL Server database',
    category: 'Database Services',
  },
  {
    port: 3306,
    protocol: 'TCP',
    service: 'MySQL',
    description: 'MySQL database server',
    category: 'Database Services',
  },
  {
    port: 5432,
    protocol: 'TCP',
    service: 'PostgreSQL',
    description: 'PostgreSQL database server',
    category: 'Database Services',
  },
  {
    port: 27017,
    protocol: 'TCP',
    service: 'MongoDB',
    description: 'MongoDB database server',
    category: 'Database Services',
  },
  {
    port: 6379,
    protocol: 'TCP',
    service: 'Redis',
    description: 'Redis in-memory data structure store',
    category: 'Database Services',
  },
  {
    port: 1521,
    protocol: 'TCP',
    service: 'Oracle',
    description: 'Oracle database server',
    category: 'Database Services',
  },
  {
    port: 9042,
    protocol: 'TCP',
    service: 'Cassandra',
    description: 'Apache Cassandra database',
    category: 'Database Services',
  },

  // Messaging & Streaming
  {
    port: 1883,
    protocol: 'TCP',
    service: 'MQTT',
    description: 'Message Queuing Telemetry Transport - lightweight messaging protocol',
    category: 'Messaging & Streaming',
  },
  {
    port: 5672,
    protocol: 'TCP',
    service: 'AMQP',
    description: 'Advanced Message Queuing Protocol',
    category: 'Messaging & Streaming',
  },
  {
    port: 5671,
    protocol: 'TCP',
    service: 'AMQPS',
    description: 'AMQP over SSL/TLS',
    category: 'Messaging & Streaming',
  },
  {
    port: 61613,
    protocol: 'TCP',
    service: 'STOMP',
    description: 'Simple Text Oriented Messaging Protocol',
    category: 'Messaging & Streaming',
  },
  {
    port: 1935,
    protocol: 'TCP',
    service: 'RTMP',
    description: 'Real-Time Messaging Protocol - used for streaming audio, video, and data',
    category: 'Messaging & Streaming',
  },
  {
    port: 9092,
    protocol: 'TCP',
    service: 'Kafka',
    description: 'Apache Kafka distributed streaming platform',
    category: 'Messaging & Streaming',
  },

  // Network Management
  {
    port: 161,
    protocol: 'UDP',
    service: 'SNMP',
    description: 'Simple Network Management Protocol - monitoring network devices',
    category: 'Network Management',
  },
  {
    port: 162,
    protocol: 'UDP',
    service: 'SNMP Trap',
    description: 'SNMP Trap - notifications from SNMP agents',
    category: 'Network Management',
  },
  {
    port: 514,
    protocol: 'UDP',
    service: 'Syslog',
    description: 'System Logging Protocol - used for system message logging',
    category: 'Network Management',
  },
  {
    port: 123,
    protocol: 'UDP',
    service: 'NTP',
    description: 'Network Time Protocol - used for time synchronization',
    category: 'Network Management',
  },

  // VPN & Tunneling
  {
    port: 1194,
    protocol: 'TCP/UDP',
    service: 'OpenVPN',
    description: 'OpenVPN - virtual private network service',
    category: 'VPN & Tunneling',
  },
  {
    port: 1701,
    protocol: 'UDP',
    service: 'L2TP',
    description: 'Layer 2 Tunneling Protocol',
    category: 'VPN & Tunneling',
  },
  {
    port: 500,
    protocol: 'UDP',
    service: 'IKEv2/IPsec',
    description: 'Internet Key Exchange v2 for IPsec VPNs',
    category: 'VPN & Tunneling',
  },
  {
    port: 4500,
    protocol: 'UDP',
    service: 'IPsec NAT-T',
    description: 'IPsec NAT Traversal',
    category: 'VPN & Tunneling',
  },

  // Version Control
  {
    port: 9418,
    protocol: 'TCP',
    service: 'Git',
    description: 'Git version control system protocol',
    category: 'Version Control',
  },

  // Web Development
  {
    port: 3000,
    protocol: 'TCP',
    service: 'Development Server',
    description: 'Common port for Node.js and React development servers',
    category: 'Web Development',
  },
  {
    port: 4200,
    protocol: 'TCP',
    service: 'Angular',
    description: 'Default Angular development server',
    category: 'Web Development',
  },
  {
    port: 8000,
    protocol: 'TCP',
    service: 'Django',
    description: 'Common port for Django development server',
    category: 'Web Development',
  },
  {
    port: 5000,
    protocol: 'TCP',
    service: 'Flask/Python',
    description: 'Common port for Flask and Python web servers',
    category: 'Web Development',
  },
  {
    port: 8080,
    protocol: 'TCP',
    service: 'Tomcat',
    description: 'Apache Tomcat server default port',
    category: 'Web Development',
  },
];
