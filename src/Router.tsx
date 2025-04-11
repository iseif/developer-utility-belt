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
import CodeMinifierPage from './pages/CodeMinifierPage';
import CaseConverterPage from './pages/CaseConverterPage';
import LineToolsPage from './pages/LineToolsPage';
import TextCounterPage from './pages/TextCounterPage';
import CsvViewerPage from './pages/CsvViewerPage';
import JsonCsvConverterPage from './pages/JsonCsvConverterPage';
import DataGeneratorPage from './pages/DataGeneratorPage';
import GradientGeneratorPage from './pages/GradientGeneratorPage';
import SvgOptimizerPage from './pages/SvgOptimizerPage';
import UnitConverterPage from './pages/UnitConverterPage';
import LayoutGeneratorPage from './pages/LayoutGeneratorPage';
import HashGeneratorPage from './pages/HashGeneratorPage';
import PasswordGeneratorPage from './pages/PasswordGeneratorPage';
import CronHelperPage from './pages/CronHelperPage';
import MarkdownPreviewerPage from './pages/MarkdownPreviewerPage';
import UuidGeneratorPage from './pages/UuidGeneratorPage';
import HttpStatusCodesPage from './pages/HttpStatusCodesPage';
import TextEscaperPage from './pages/TextEscaperPage';
import SlugifyPage from './pages/SlugifyPage';
import BaseConverterPage from './pages/BaseConverterPage';
import HexViewerPage from './pages/HexViewerPage';
import MimeLookupPage from './pages/MimeLookupPage';
import BoxShadowGeneratorPage from './pages/BoxShadowGeneratorPage';
import HmacGeneratorPage from './pages/HmacGeneratorPage';
import AsciiTablePage from './pages/AsciiTablePage';
import HtmlEntitiesPage from './pages/HtmlEntitiesPage';
import HttpHeadersPage from './pages/HttpHeadersPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/formatter" element={<CodeFormatterPage />} />
      <Route path="/json-tools" element={<JsonToolsPage />} />
      <Route path="/diff" element={<DiffCheckerPage />} />
      <Route path="/timestamp" element={<TimestampConverterPage />} />
      <Route path="/url-encode-decode" element={<UrlEncoderDecoderPage />} />
      <Route
        path="/base64-encode-decode"
        element={<Base64EncoderDecoderPage />}
      />
      <Route
        path="/html-entity-encode-decode"
        element={<HtmlEntityEncoderDecoderPage />}
      />
      <Route path="/jwt-debugger" element={<JwtDebuggerPage />} />
      <Route path="/ip-info" element={<IpInfoPage />} />
      <Route path="/user-agent-parser" element={<UserAgentParserPage />} />
      <Route path="/color-tools" element={<ColorToolsPage />} />
      <Route path="/minifier" element={<CodeMinifierPage />} />
      <Route path="/case-converter" element={<CaseConverterPage />} />
      <Route path="/line-tools" element={<LineToolsPage />} />
      <Route path="/counter" element={<TextCounterPage />} />
      <Route path="/csv-viewer" element={<CsvViewerPage />} />
      <Route path="/json-csv-converter" element={<JsonCsvConverterPage />} />
      <Route path="/data-generator" element={<DataGeneratorPage />} />
      <Route path="/gradient-generator" element={<GradientGeneratorPage />} />
      <Route path="/svg-optimizer" element={<SvgOptimizerPage />} />
      <Route path="/unit-converter" element={<UnitConverterPage />} />
      <Route path="/layout-generator" element={<LayoutGeneratorPage />} />
      <Route path="/hash-generator" element={<HashGeneratorPage />} />
      <Route path="/password-generator" element={<PasswordGeneratorPage />} />
      <Route path="/cron-helper" element={<CronHelperPage />} />
      <Route path="/markdown-previewer" element={<MarkdownPreviewerPage />} />
      <Route path="/uuid-generator" element={<UuidGeneratorPage />} />
      <Route path="/http-status-codes" element={<HttpStatusCodesPage />} />
      <Route path="/http-headers" element={<HttpHeadersPage />} />
      <Route path="/text-escaper" element={<TextEscaperPage />} />
      <Route path="/slugify" element={<SlugifyPage />} />
      <Route path="/base-converter" element={<BaseConverterPage />} />
      <Route path="/hex-viewer" element={<HexViewerPage />} />
      <Route path="/mime-lookup" element={<MimeLookupPage />} />
      <Route
        path="/box-shadow-generator"
        element={<BoxShadowGeneratorPage />}
      />
      <Route path="/hmac-generator" element={<HmacGeneratorPage />} />
      <Route path="/ascii-table" element={<AsciiTablePage />} />
      <Route path="/html-entities" element={<HtmlEntitiesPage />} />

      {/* Add routes for other pages here */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
