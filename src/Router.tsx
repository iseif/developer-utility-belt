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
import ImageEditorPage from './pages/ImageEditorPage';
import RegexTesterPage from './pages/RegexTesterPage';
import NetworkPortsPage from './pages/NetworkPortsPage';
import CheatSheetsIndexPage from './pages/cheat-sheets/CheatSheetsIndexPage';
import GitCheatSheetPage from './pages/cheat-sheets/GitCheatSheetPage';
import BashCheatSheetPage from './pages/cheat-sheets/BashCheatSheetPage';
import DockerCheatSheetPage from './pages/cheat-sheets/DockerCheatSheetPage';
import SqlCheatSheetPage from './pages/cheat-sheets/SqlCheatSheetPage';
import PythonCheatSheetPage from './pages/cheat-sheets/PythonCheatSheetPage';
import JavaScriptCheatSheetPage from './pages/cheat-sheets/JavaScriptCheatSheetPage';
import CssLayoutCheatSheetPage from './pages/cheat-sheets/CssLayoutCheatSheetPage';
import RegexCheatSheetPage from './pages/cheat-sheets/RegexCheatSheetPage';
import TypeScriptCheatSheetPage from './pages/cheat-sheets/TypeScriptCheatSheetPage';
import ReactHooksCheatSheetPage from './pages/cheat-sheets/ReactHooksCheatSheetPage';
import JavaCheatSheetPage from './pages/cheat-sheets/JavaCheatSheetPage';
import SpringBootCheatSheetPage from './pages/cheat-sheets/SpringBootCheatSheetPage';
import NpmYarnCheatSheetPage from './pages/cheat-sheets/NpmYarnCheatSheetPage';
import MavenCheatSheetPage from './pages/cheat-sheets/MavenCheatSheetPage';

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
      <Route path="/network-ports" element={<NetworkPortsPage />} />
      <Route path="/text-escaper" element={<TextEscaperPage />} />
      <Route path="/slugify" element={<SlugifyPage />} />
      <Route path="/base-converter" element={<BaseConverterPage />} />
      <Route path="/hex-viewer" element={<HexViewerPage />} />
      <Route path="/mime-lookup" element={<MimeLookupPage />} />
      <Route path="/regex-tester" element={<RegexTesterPage />} />
      <Route
        path="/box-shadow-generator"
        element={<BoxShadowGeneratorPage />}
      />
      <Route path="/hmac-generator" element={<HmacGeneratorPage />} />
      <Route path="/ascii-table" element={<AsciiTablePage />} />
      <Route path="/html-entities" element={<HtmlEntitiesPage />} />
      <Route path="/image-editor" element={<ImageEditorPage />} />

      {/* Cheat Sheets Routes */}
      <Route path="/cheat-sheets" element={<CheatSheetsIndexPage />} />
      <Route path="/cheat-sheets/git" element={<GitCheatSheetPage />} />
      <Route path="/cheat-sheets/bash" element={<BashCheatSheetPage />} />
      <Route path="/cheat-sheets/docker" element={<DockerCheatSheetPage />} />
      <Route
        path="/cheat-sheets/npm-yarn"
        element={<NpmYarnCheatSheetPage />}
      />
      <Route path="/cheat-sheets/maven" element={<MavenCheatSheetPage />} />
      <Route path="/cheat-sheets/sql" element={<SqlCheatSheetPage />} />
      <Route path="/cheat-sheets/python" element={<PythonCheatSheetPage />} />
      <Route
        path="/cheat-sheets/javascript"
        element={<JavaScriptCheatSheetPage />}
      />
      <Route
        path="/cheat-sheets/css-layout"
        element={<CssLayoutCheatSheetPage />}
      />
      <Route path="/cheat-sheets/regex" element={<RegexCheatSheetPage />} />
      <Route
        path="/cheat-sheets/typescript"
        element={<TypeScriptCheatSheetPage />}
      />
      <Route
        path="/cheat-sheets/react-hooks"
        element={<ReactHooksCheatSheetPage />}
      />
      <Route path="/cheat-sheets/java" element={<JavaCheatSheetPage />} />
      <Route
        path="/cheat-sheets/spring-boot"
        element={<SpringBootCheatSheetPage />}
      />

      {/* Add routes for other pages here */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
