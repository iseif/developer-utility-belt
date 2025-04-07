import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CodeFormatterPage from './pages/CodeFormatterPage';
import DiffCheckerPage from './pages/DiffCheckerPage';
import JsonToolsPage from './pages/JsonToolsPage';
import NotFoundPage from './pages/NotFoundPage';
import TimestampConverterPage from './pages/TimestampConverterPage';
import UrlEncoderDecoderPage from './pages/UrlEncoderDecoderPage';
import Base64EncoderDecoderPage from './pages/Base64EncoderDecoderPage';
import HtmlEntityEncoderDecoderPage from './pages/HtmlEntityEncoderDecoderPage';
import JwtDebuggerPage from './pages/JwtDebuggerPage';
import IpInfoPage from './pages/IpInfoPage';
import UserAgentParserPage from './pages/UserAgentParserPage';
import ColorToolsPage from './pages/ColorToolsPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/formatter" element={<CodeFormatterPage />} />
      <Route path="/json-tools" element={<JsonToolsPage />} />
      <Route path="/diff" element={<DiffCheckerPage />} />
      <Route path="/timestamp" element={<TimestampConverterPage />} />
      <Route path="/url-encode-decode" element={<UrlEncoderDecoderPage />} />
      <Route path="/base64-encode-decode" element={<Base64EncoderDecoderPage />} />
      <Route path="/html-entity-encode-decode" element={<HtmlEntityEncoderDecoderPage />} />
      <Route path="/jwt-debugger" element={<JwtDebuggerPage />} />
      <Route path="/ip-info" element={<IpInfoPage />} />
      <Route path="/user-agent-parser" element={<UserAgentParserPage />} />
      <Route path="/color-tools" element={<ColorToolsPage />} />

      {/* Add routes for other pages here */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
