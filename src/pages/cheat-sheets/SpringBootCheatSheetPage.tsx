import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaLeaf, FaSearch } from 'react-icons/fa';

// Interface for example data
interface SpringBootExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for category
interface CodeCategory {
  title: string;
  examples: SpringBootExample[];
}

const springBootExamplesData: CodeCategory[] = [
  {
    title: 'Core Concepts',
    examples: [
      {
        code: '// Dependency Injection (DI)\n// Spring manages object creation and injects dependencies\n\n@Service\npublic class UserService {\n    private final UserRepository userRepository;\n    \n    // Constructor injection (preferred)\n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n    \n    public User findById(Long id) {\n        return userRepository.findById(id).orElse(null);\n    }\n}',
        description:
          'Dependency Injection: Spring creates and manages objects (beans) and injects them where needed. Constructor injection is the recommended approach.',
      },
      {
        code: '// Inversion of Control (IoC)\n// The framework controls the flow, not your code\n\n// Instead of:\nUserRepository repository = new UserRepositoryImpl();\nUserService service = new UserServiceImpl(repository);\n\n// With Spring IoC:\n@Autowired\nprivate UserService userService; // Spring creates and injects it',
        description:
          "Inversion of Control: The Spring container manages the lifecycle and configuration of application objects. You don't create objects; the container provides them to you.",
      },
      {
        code: '// Auto-configuration\n// Spring Boot automatically configures beans based on dependencies\n\n// Just add dependencies to pom.xml:\n/*\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-data-jpa</artifactId>\n</dependency>\n<dependency>\n    <groupId>com.h2database</groupId>\n    <artifactId>h2</artifactId>\n    <scope>runtime</scope>\n</dependency>\n*/\n\n// Spring Boot automatically configures:\n// - DataSource\n// - EntityManagerFactory\n// - JpaTransactionManager\n// - And more...',
        description:
          "Auto-configuration: Spring Boot automatically configures your application based on the dependencies you've added, with sensible defaults that can be overridden.",
      },
      {
        code: '// Spring Boot Starters\n// Dependency descriptors that simplify build configuration\n\n// Instead of adding multiple individual dependencies:\n/*\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n*/\n\n// This single starter includes:\n// - Spring MVC\n// - Jackson for JSON\n// - Tomcat as embedded server\n// - Validation\n// - And more...',
        description:
          'Spring Boot Starters: Curated sets of dependencies that simplify build configuration. Each starter addresses a specific type of application or technology.',
      },
    ],
  },
  {
    title: 'Application Annotations',
    examples: [
      {
        code: '// Main application class\n@SpringBootApplication\npublic class MyApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApplication.class, args);\n    }\n}',
        description:
          '@SpringBootApplication: The main annotation that bootstraps a Spring Boot application. It combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.',
      },
      {
        code: '// @SpringBootApplication is equivalent to:\n@Configuration\n@EnableAutoConfiguration\n@ComponentScan\npublic class MyApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApplication.class, args);\n    }\n}',
        description:
          "@SpringBootApplication components: @Configuration marks the class as a bean definition source, @EnableAutoConfiguration enables Spring Boot's auto-configuration, and @ComponentScan tells Spring to scan the package for components.",
      },
      {
        code: '// Customizing component scan\n@SpringBootApplication(\n    scanBasePackages = {"com.example.api", "com.example.service"}\n)\npublic class MyApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApplication.class, args);\n    }\n}',
        description:
          'You can customize the component scan to specific packages using the scanBasePackages attribute.',
      },
    ],
  },
  {
    title: 'Component Stereotypes',
    examples: [
      {
        code: '// @Component - generic stereotype for Spring-managed components\n@Component\npublic class EmailService {\n    public void sendEmail(String to, String subject, String body) {\n        // Email sending logic\n    }\n}',
        description:
          '@Component: Base annotation that indicates a class is a Spring component. Spring will detect and register it as a bean.',
      },
      {
        code: '// @Service - indicates business service\n@Service\npublic class UserService {\n    private final UserRepository userRepository;\n    \n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n    \n    public User register(User user) {\n        // Business logic\n        return userRepository.save(user);\n    }\n}',
        description:
          '@Service: Specialization of @Component for classes that provide business services. Functionally equivalent to @Component but more descriptive.',
      },
      {
        code: '// @Repository - indicates data access object\n@Repository\npublic class JpaUserRepository implements UserRepository {\n    private final UserJpaRepository jpaRepository;\n    \n    public JpaUserRepository(UserJpaRepository jpaRepository) {\n        this.jpaRepository = jpaRepository;\n    }\n    \n    @Override\n    public User findById(Long id) {\n        return jpaRepository.findById(id).orElse(null);\n    }\n}',
        description:
          '@Repository: Specialization of @Component for data access objects. Also provides automatic translation of persistence exceptions.',
      },
      {
        code: '// @Controller - indicates web controller (returns views)\n@Controller\npublic class UserController {\n    private final UserService userService;\n    \n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n    \n    @GetMapping("/users/{id}")\n    public String getUser(@PathVariable Long id, Model model) {\n        model.addAttribute("user", userService.findById(id));\n        return "user-details"; // Returns view name\n    }\n}',
        description:
          '@Controller: Specialization of @Component for web controllers that return views. Used with template engines like Thymeleaf.',
      },
      {
        code: '// @RestController - indicates REST API controller\n@RestController\n@RequestMapping("/api/users")\npublic class UserRestController {\n    private final UserService userService;\n    \n    public UserRestController(UserService userService) {\n        this.userService = userService;\n    }\n    \n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) {\n        return userService.findById(id); // Returns object (converted to JSON)\n    }\n}',
        description:
          '@RestController: Combines @Controller and @ResponseBody. Indicates that each method returns a domain object instead of a view. Used for REST APIs.',
      },
    ],
  },
  {
    title: 'Dependency Injection Annotations',
    examples: [
      {
        code: '// @Autowired - injects dependencies\n@Service\npublic class UserService {\n    // Field injection (not recommended for mandatory dependencies)\n    @Autowired\n    private UserRepository userRepository;\n    \n    // Constructor injection (preferred)\n    @Autowired // Optional in newer Spring versions\n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n    \n    // Setter injection\n    @Autowired\n    public void setUserRepository(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n}',
        description:
          "@Autowired: Marks a constructor, field, or setter method to be autowired by Spring's dependency injection. Constructor injection is recommended for required dependencies.",
      },
      {
        code: '// @Qualifier - specifies which bean to inject\n@Service\npublic class NotificationService {\n    private final MessageSender messageSender;\n    \n    public NotificationService(\n        @Qualifier("emailSender") MessageSender messageSender\n    ) {\n        this.messageSender = messageSender;\n    }\n}\n\n@Component("emailSender")\npublic class EmailSender implements MessageSender {\n    // Implementation\n}\n\n@Component("smsSender")\npublic class SmsSender implements MessageSender {\n    // Implementation\n}',
        description:
          '@Qualifier: Specifies which bean should be injected when multiple beans of the same type exist. Works with @Autowired.',
      },
      {
        code: '// @Value - injects property values\n@Service\npublic class EmailService {\n    // From application.properties\n    @Value("${mail.from}")\n    private String fromAddress;\n    \n    // Default value if property not found\n    @Value("${mail.subject:No Subject}")\n    private String defaultSubject;\n    \n    // SpEL (Spring Expression Language)\n    @Value("#{systemProperties[\'user.timezone\']}")\n    private String timezone;\n}',
        description:
          '@Value: Injects values from properties files, default values, or SpEL expressions into fields or method parameters.',
      },
    ],
  },
  {
    title: 'Web & REST Annotations',
    examples: [
      {
        code: '// @RequestMapping - maps web requests to handler methods\n@RestController\n@RequestMapping("/api/users") // Base path for all methods\npublic class UserController {\n    // Combined with class-level mapping: /api/users\n    @RequestMapping(method = RequestMethod.GET)\n    public List<User> getAllUsers() {\n        // Implementation\n    }\n    \n    // Combined with class-level mapping: /api/users/{id}\n    @RequestMapping(path = "/{id}", method = RequestMethod.GET)\n    public User getUser(@PathVariable Long id) {\n        // Implementation\n    }\n}',
        description:
          '@RequestMapping: Maps web requests to handler methods. Can be used at class level (for base path) and method level. Supports various attributes like method, path, consumes, produces, etc.',
      },
      {
        code: '// HTTP method-specific mapping annotations\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    // GET /api/users\n    @GetMapping\n    public List<User> getAllUsers() { /* ... */ }\n    \n    // GET /api/users/{id}\n    @GetMapping("/{id}")\n    public User getUser(@PathVariable Long id) { /* ... */ }\n    \n    // POST /api/users\n    @PostMapping\n    public User createUser(@RequestBody User user) { /* ... */ }\n    \n    // PUT /api/users/{id}\n    @PutMapping("/{id}")\n    public User updateUser(\n        @PathVariable Long id,\n        @RequestBody User user\n    ) { /* ... */ }\n    \n    // DELETE /api/users/{id}\n    @DeleteMapping("/{id}")\n    public void deleteUser(@PathVariable Long id) { /* ... */ }\n}',
        description:
          'HTTP method-specific annotations (@GetMapping, @PostMapping, @PutMapping, @DeleteMapping) are shorthand for @RequestMapping with the method attribute set.',
      },
      {
        code: '// Request parameter annotations\n@RestController\n@RequestMapping("/api")\npublic class ProductController {\n    // Path variable: /api/products/123\n    @GetMapping("/products/{id}")\n    public Product getProduct(@PathVariable Long id) { /* ... */ }\n    \n    // Request parameter: /api/products?category=electronics&sort=price\n    @GetMapping("/products")\n    public List<Product> getProducts(\n        @RequestParam String category,\n        @RequestParam(defaultValue = "name") String sort,\n        @RequestParam(required = false) Integer limit\n    ) { /* ... */ }\n    \n    // Request body (from JSON)\n    @PostMapping("/products")\n    public Product createProduct(@RequestBody Product product) { /* ... */ }\n    \n    // Request header\n    @GetMapping("/secure")\n    public String secureEndpoint(\n        @RequestHeader("Authorization") String authHeader\n    ) { /* ... */ }\n}',
        description:
          'Request parameter annotations: @PathVariable extracts values from the URI path, @RequestParam from query parameters, @RequestBody from the request body (typically JSON), and @RequestHeader from HTTP headers.',
      },
      {
        code: '// Response handling annotations\n@RestController\n@RequestMapping("/api")\npublic class ResponseExampleController {\n    // @ResponseBody (included in @RestController)\n    @GetMapping("/data")\n    @ResponseBody // Not needed with @RestController\n    public DataObject getData() {\n        return new DataObject(); // Converted to JSON\n    }\n    \n    // @ResponseStatus\n    @PostMapping("/items")\n    @ResponseStatus(HttpStatus.CREATED) // Returns 201 status\n    public Item createItem(@RequestBody Item item) { /* ... */ }\n    \n    // ResponseEntity for full control\n    @GetMapping("/users/{id}")\n    public ResponseEntity<User> getUser(@PathVariable Long id) {\n        User user = userService.findById(id);\n        if (user == null) {\n            return ResponseEntity.notFound().build(); // 404\n        }\n        return ResponseEntity.ok(user); // 200 with user in body\n    }\n}',
        description:
          'Response handling: @ResponseBody converts the return value to JSON/XML (implicit with @RestController), @ResponseStatus sets the HTTP status code, and ResponseEntity gives full control over the response (status, headers, body).',
      },
    ],
  },
  {
    title: 'Configuration Annotations',
    examples: [
      {
        code: '// @Configuration - marks a class as a bean definition source\n@Configuration\npublic class AppConfig {\n    @Bean\n    public RestTemplate restTemplate() {\n        return new RestTemplate();\n    }\n    \n    @Bean\n    public ObjectMapper objectMapper() {\n        ObjectMapper mapper = new ObjectMapper();\n        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);\n        return mapper;\n    }\n}',
        description:
          '@Configuration: Indicates that a class declares one or more @Bean methods and may be processed by Spring to generate bean definitions.',
      },
      {
        code: '// @Bean - declares a Spring bean\n@Configuration\npublic class DatabaseConfig {\n    @Bean\n    public DataSource dataSource() {\n        DriverManagerDataSource dataSource = new DriverManagerDataSource();\n        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");\n        dataSource.setUrl("jdbc:mysql://localhost:3306/mydb");\n        dataSource.setUsername("user");\n        dataSource.setPassword("password");\n        return dataSource;\n    }\n    \n    @Bean\n    public JdbcTemplate jdbcTemplate(DataSource dataSource) {\n        return new JdbcTemplate(dataSource);\n    }\n}',
        description:
          '@Bean: Indicates that a method produces a bean to be managed by Spring. The method name becomes the bean name by default.',
      },
      {
        code: '// @PropertySource - loads properties files\n@Configuration\n@PropertySource("classpath:database.properties")\npublic class DatabaseConfig {\n    @Autowired\n    private Environment env;\n    \n    @Bean\n    public DataSource dataSource() {\n        DriverManagerDataSource dataSource = new DriverManagerDataSource();\n        dataSource.setUrl(env.getProperty("db.url"));\n        dataSource.setUsername(env.getProperty("db.username"));\n        dataSource.setPassword(env.getProperty("db.password"));\n        return dataSource;\n    }\n}',
        description:
          "@PropertySource: Indicates the location of properties files to be added to Spring's Environment. Used with @Configuration classes.",
      },
      {
        code: '// @ConfigurationProperties - binds properties to a class\n@Configuration\n@ConfigurationProperties(prefix = "mail")\npublic class MailProperties {\n    private String host;\n    private int port;\n    private String username;\n    private String password;\n    private boolean auth;\n    private boolean starttls;\n    \n    // Getters and setters\n    public String getHost() { return host; }\n    public void setHost(String host) { this.host = host; }\n    // Other getters and setters...\n}\n\n// In application.properties:\n// mail.host=smtp.example.com\n// mail.port=587\n// mail.username=user\n// mail.password=pass\n// mail.auth=true\n// mail.starttls=true',
        description:
          '@ConfigurationProperties: Binds external configuration properties to a Java bean. Properties are automatically mapped to fields with matching names.',
      },
    ],
  },
  {
    title: 'Data (JPA) Annotations',
    examples: [
      {
        code: '// @Entity - marks a class as a JPA entity\n@Entity\n@Table(name = "users") // Optional: specify table name\npublic class User {\n    @Id // Primary key\n    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment\n    private Long id;\n    \n    @Column(name = "username", nullable = false, unique = true)\n    private String username;\n    \n    @Column(name = "email")\n    private String email;\n    \n    @Temporal(TemporalType.TIMESTAMP)\n    @Column(name = "created_at")\n    private Date createdAt;\n    \n    // Getters and setters\n}',
        description:
          '@Entity: Marks a class as a JPA entity (a persistent domain object). @Table customizes the table, @Id marks the primary key, @GeneratedValue defines key generation, and @Column customizes columns.',
      },
      {
        code: '// Entity relationships\n@Entity\npublic class Post {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    private String title;\n    \n    // Many-to-one relationship\n    @ManyToOne\n    @JoinColumn(name = "author_id")\n    private User author;\n    \n    // One-to-many relationship\n    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)\n    private List<Comment> comments;\n    \n    // Many-to-many relationship\n    @ManyToMany\n    @JoinTable(\n        name = "post_tags",\n        joinColumns = @JoinColumn(name = "post_id"),\n        inverseJoinColumns = @JoinColumn(name = "tag_id")\n    )\n    private Set<Tag> tags;\n}',
        description:
          'Entity relationships: @ManyToOne, @OneToMany, @OneToOne, and @ManyToMany define relationships between entities. @JoinColumn and @JoinTable customize the join columns and tables.',
      },
      {
        code: '// Spring Data JPA Repository\n// No implementation needed - Spring generates it\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {\n    // Derived query method (Spring generates SQL)\n    List<User> findByEmailContaining(String email);\n    \n    // Custom query with JPQL\n    @Query("SELECT u FROM User u WHERE u.active = true AND u.email LIKE %:domain%")\n    List<User> findActiveUsersByEmailDomain(@Param("domain") String domain);\n    \n    // Native SQL query\n    @Query(value = "SELECT * FROM users WHERE created_at > :date", nativeQuery = true)\n    List<User> findUsersCreatedAfter(@Param("date") Date date);\n    \n    // Modifying query\n    @Modifying\n    @Transactional\n    @Query("UPDATE User u SET u.active = false WHERE u.lastLoginDate < :date")\n    int deactivateInactiveUsers(@Param("date") Date date);\n}',
        description:
          'Spring Data JPA Repository: Extend JpaRepository to get CRUD operations for free. Define custom query methods by method name conventions or using @Query annotation.',
      },
    ],
  },
  {
    title: 'Application Properties',
    examples: [
      {
        code: '# application.properties - common settings\n\n# Server configuration\nserver.port=8080\nserver.servlet.context-path=/api\n\n# Database configuration\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=user\nspring.datasource.password=password\nspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver\n\n# JPA / Hibernate\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\nspring.jpa.properties.hibernate.format_sql=true\nspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect\n\n# Logging\nlogging.level.root=INFO\nlogging.level.org.springframework.web=DEBUG\nlogging.level.org.hibernate=ERROR\n\n# Custom application properties\napp.name=My Spring Boot App\napp.description=A description of my application\napp.api.version=v1',
        description:
          'application.properties: Common configuration properties for server settings, database connection, JPA/Hibernate, logging, and custom application properties.',
      },
      {
        code: '# application.properties - profiles\n\n# Default profile\nspring.profiles.active=dev\n\n# Common properties for all profiles\napp.name=My Application\n\n---\n# Development profile\nspring.config.activate.on-profile=dev\nserver.port=8080\nspring.datasource.url=jdbc:h2:mem:devdb\nlogging.level.root=DEBUG\n\n---\n# Production profile\nspring.config.activate.on-profile=prod\nserver.port=80\nspring.datasource.url=jdbc:mysql://prod-db:3306/proddb\nlogging.level.root=WARN',
        description:
          'Profiles in application.properties: Define different configurations for different environments (dev, test, prod) using profiles.',
      },
      {
        code: '# YAML configuration (application.yml)\n\n# Server settings\nserver:\n  port: 8080\n  servlet:\n    context-path: /api\n\n# Spring settings\nspring:\n  # Database\n  datasource:\n    url: jdbc:mysql://localhost:3306/mydb\n    username: user\n    password: password\n    driver-class-name: com.mysql.cj.jdbc.Driver\n  \n  # JPA / Hibernate\n  jpa:\n    hibernate:\n      ddl-auto: update\n    show-sql: true\n    properties:\n      hibernate:\n        format_sql: true\n        dialect: org.hibernate.dialect.MySQL8Dialect\n\n# Logging configuration\nlogging:\n  level:\n    root: INFO\n    org.springframework.web: DEBUG\n    org.hibernate: ERROR\n\n# Custom properties\napp:\n  name: My Spring Boot App\n  description: A description of my application\n  api:\n    version: v1',
        description:
          'application.yml: YAML alternative to properties file with hierarchical configuration. More readable for complex configurations.',
      },
    ],
  },
  {
    title: 'Project Structure & Examples',
    examples: [
      {
        code: '// Typical Spring Boot project structure\n\n// src/main/java - Java source files\n// com.example.myapp\n//   ├── MyApplication.java (main class)\n//   ├── config/\n//   │   └── AppConfig.java\n//   ├── controller/\n//   │   └── UserController.java\n//   ├── model/\n//   │   └── User.java\n//   ├── repository/\n//   │   └── UserRepository.java\n//   └── service/\n//       └── UserService.java\n\n// src/main/resources - configuration files\n//   ├── application.properties\n//   ├── static/ (static web resources)\n//   └── templates/ (template files)\n\n// src/test/java - test files\n//   └── com.example.myapp\n//       └── controller/\n//           └── UserControllerTest.java',
        description:
          'Typical Spring Boot project structure with packages for controllers, services, repositories, models, and configuration.',
      },
      {
        code: '// Maven build file (pom.xml)\n<project>\n    <modelVersion>4.0.0</modelVersion>\n    \n    <groupId>com.example</groupId>\n    <artifactId>my-app</artifactId>\n    <version>0.0.1-SNAPSHOT</version>\n    <name>my-app</name>\n    \n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>2.7.0</version>\n    </parent>\n    \n    <dependencies>\n        <!-- Web starter -->\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        \n        <!-- Data JPA starter -->\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-data-jpa</artifactId>\n        </dependency>\n        \n        <!-- Database driver -->\n        <dependency>\n            <groupId>mysql</groupId>\n            <artifactId>mysql-connector-java</artifactId>\n            <scope>runtime</scope>\n        </dependency>\n        \n        <!-- Test starter -->\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-test</artifactId>\n            <scope>test</scope>\n        </dependency>\n    </dependencies>\n    \n    <build>\n        <plugins>\n            <plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>\n        </plugins>\n    </build>\n</project>',
        description:
          'Maven build file (pom.xml) for a Spring Boot project with common dependencies.',
      },
      {
        code: '// Complete REST API example\n\n// Main application class\n@SpringBootApplication\npublic class MyApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApplication.class, args);\n    }\n}\n\n// Entity\n@Entity\n@Table(name = "users")\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false)\n    private String name;\n    \n    private String email;\n    \n    // Getters and setters\n}\n\n// Repository\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long> {\n    List<User> findByNameContaining(String name);\n}\n\n// Service\n@Service\npublic class UserService {\n    private final UserRepository userRepository;\n    \n    public UserService(UserRepository userRepository) {\n        this.userRepository = userRepository;\n    }\n    \n    public List<User> getAllUsers() {\n        return userRepository.findAll();\n    }\n    \n    public User getUserById(Long id) {\n        return userRepository.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException("User not found"));\n    }\n    \n    public User createUser(User user) {\n        return userRepository.save(user);\n    }\n    \n    // Other methods...\n}\n\n// Controller\n@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n    private final UserService userService;\n    \n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n    \n    @GetMapping\n    public List<User> getAllUsers() {\n        return userService.getAllUsers();\n    }\n    \n    @GetMapping("/{id}")\n    public User getUserById(@PathVariable Long id) {\n        return userService.getUserById(id);\n    }\n    \n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    public User createUser(@RequestBody User user) {\n        return userService.createUser(user);\n    }\n    \n    // Other endpoints...\n}',
        description:
          'Complete REST API example with entity, repository, service, and controller classes following Spring Boot best practices.',
      },
    ],
  },
];

const SpringBootCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CodeCategory[]>(
    springBootExamplesData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(springBootExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = springBootExamplesData
      .map((category) => {
        const matchedExamples = category.examples.filter(
          (example) =>
            example.code.toLowerCase().includes(query) ||
            example.description.toLowerCase().includes(query) ||
            (example.output && example.output.toLowerCase().includes(query))
        );

        return {
          ...category,
          examples: matchedExamples,
        };
      })
      .filter((category) => category.examples.length > 0);

    setFilteredData(filtered);
  }, [searchQuery]);

  // Apply filtering when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterExamples();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterExamples]);

  // Handle copy to clipboard
  const handleCopy = async (text: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [exampleId]: '✓' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [exampleId]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <FaLeaf className="inline-block mr-2 text-green-600" /> Spring Boot
          Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference for Spring Boot core concepts, annotations,
          and configuration options. Find examples for dependency injection, web
          controllers, data access, and application properties.
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search annotations, concepts, or code examples..."
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-inner"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Examples by Category */}
      <div className="space-y-8">
        {filteredData.length > 0 ? (
          filteredData.map((category) => (
            <section
              key={category.title}
              className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid"
            >
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.examples.map((example, index) => {
                  const exampleId = `${category.title}-${index}`;
                  return (
                    <div
                      key={exampleId}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                            {example.description}
                          </p>
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                            <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap overflow-x-auto">
                              {example.code}
                            </pre>
                            <button
                              onClick={() =>
                                handleCopy(example.code, exampleId)
                              }
                              className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                              title="Copy to clipboard"
                            >
                              {copyStatus[exampleId] ? (
                                <span className="text-xs">
                                  {copyStatus[exampleId]}
                                </span>
                              ) : (
                                <FaCopy />
                              )}
                            </button>
                          </div>
                          {example.output && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400">
                              Output: {example.output}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="p-4 text-center border-2 border-border-color dark:border-dark-border-color">
            <p className="text-gray-700 dark:text-gray-300">
              No examples found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About Spring Boot Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Spring Boot
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Spring Boot</strong> is an extension of the Spring Framework
            that simplifies the process of building production-ready
            applications. It provides a set of tools and conventions that allow
            developers to create stand-alone, production-grade Spring-based
            applications with minimal configuration.
          </p>
          <p>
            <strong>Key features of Spring Boot:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Auto-configuration: Automatically configures your application
              based on the dependencies you've added
            </li>
            <li>
              Standalone: Creates stand-alone Spring applications that can be
              started with 'java -jar'
            </li>
            <li>
              Opinionated: Provides opinionated 'starter' dependencies to
              simplify build configuration
            </li>
            <li>
              Production-ready: Includes embedded servers, security, metrics,
              health checks, and externalized configuration
            </li>
            <li>No code generation and no XML configuration required</li>
          </ul>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://spring.io/projects/spring-boot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Spring Boot documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default SpringBootCheatSheetPage;
