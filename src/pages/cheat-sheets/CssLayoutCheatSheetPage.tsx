import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaCss3Alt, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for CSS property example
interface CssExample {
  code: string;
  description: string;
  visual?: string; // Optional visual example (SVG or CSS)
}

// Interface for property category
interface CodeCategory {
  title: string;
  examples: CssExample[];
}

// CSS Flexbox and Grid examples organized by category
const cssLayoutExamplesData: CodeCategory[] = [
  {
    title: 'Flexbox Container Properties',
    examples: [
      {
        code: 'display: flex;',
        description:
          'Defines a flex container, enabling a flex context for all its direct children.',
      },
      {
        code: 'flex-direction: row | row-reverse | column | column-reverse;',
        description:
          'Establishes the main-axis, defining the direction flex items are placed in the flex container.',
        visual: `<div style="display:flex;justify-content:space-around;text-align:center;margin-top:10px">
          <div>
            <div style="display:flex;flex-direction:row;width:120px;height:80px;background:#f0f0f0;margin:0 auto">
              <div style="background:#4285f4;width:25%;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:25%;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:25%;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;width:25%;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">row</div>
          </div>
          <div>
            <div style="display:flex;flex-direction:row-reverse;width:120px;height:80px;background:#f0f0f0;margin:0 auto">
              <div style="background:#4285f4;width:25%;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:25%;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:25%;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;width:25%;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">row-reverse</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-around;text-align:center;margin-top:15px">
          <div>
            <div style="display:flex;flex-direction:column;width:120px;height:120px;background:#f0f0f0;margin:0 auto">
              <div style="background:#4285f4;height:25%;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;height:25%;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;height:25%;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;height:25%;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">column</div>
          </div>
          <div>
            <div style="display:flex;flex-direction:column-reverse;width:120px;height:120px;background:#f0f0f0;margin:0 auto">
              <div style="background:#4285f4;height:25%;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;height:25%;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;height:25%;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;height:25%;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">column-reverse</div>
          </div>
        </div>`,
      },
      {
        code: 'flex-wrap: nowrap | wrap | wrap-reverse;',
        description:
          'Controls whether flex items are forced onto a single line or can wrap onto multiple lines.',
        visual: `<div style="display:flex;justify-content:space-around;text-align:center;margin-top:10px">
          <div>
            <div style="display:flex;flex-wrap:nowrap;width:120px;height:60px;background:#f0f0f0;margin:0 auto;overflow:hidden">
              <div style="background:#4285f4;min-width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;min-width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;min-width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;min-width:40px;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">nowrap</div>
          </div>
          <div>
            <div style="display:flex;flex-wrap:wrap;width:120px;height:60px;background:#f0f0f0;margin:0 auto">
              <div style="background:#4285f4;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">3</div>
              <div style="background:#34a853;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">4</div>
            </div>
            <div style="font-size:12px;margin-top:5px">wrap</div>
          </div>
        </div>`,
      },
      {
        code: 'flex-flow: <flex-direction> <flex-wrap>;',
        description:
          'Shorthand property for flex-direction and flex-wrap. Example: flex-flow: row wrap;',
      },
      {
        code: 'justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;',
        description:
          'Defines how the browser distributes space between and around content items along the main-axis.',
        visual: `<div style="display:flex;flex-direction:column;gap:15px;margin-top:10px">
          <div>
            <div style="display:flex;justify-content:flex-start;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">flex-start</div>
          </div>
          <div>
            <div style="display:flex;justify-content:flex-end;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">flex-end</div>
          </div>
          <div>
            <div style="display:flex;justify-content:center;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">center</div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">space-between</div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-around;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">space-around</div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-evenly;width:100%;height:40px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">space-evenly</div>
          </div>
        </div>`,
      },
      {
        code: 'align-items: stretch | flex-start | flex-end | center | baseline;',
        description:
          'Defines how flex items are laid out along the cross axis on the current line.',
        visual: `<div style="display:flex;flex-direction:column;gap:15px;margin-top:10px">
          <div>
            <div style="display:flex;align-items:stretch;width:100%;height:80px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">stretch</div>
          </div>
          <div>
            <div style="display:flex;align-items:flex-start;width:100%;height:80px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;height:50px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">flex-start</div>
          </div>
          <div>
            <div style="display:flex;align-items:flex-end;width:100%;height:80px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;height:50px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">flex-end</div>
          </div>
          <div>
            <div style="display:flex;align-items:center;width:100%;height:80px;background:#f0f0f0">
              <div style="background:#4285f4;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
              <div style="background:#ea4335;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
              <div style="background:#fbbc05;width:40px;height:50px;color:white;display:flex;align-items:center;justify-content:center">3</div>
            </div>
            <div style="font-size:12px;margin-top:5px">center</div>
          </div>
        </div>`,
      },
      {
        code: 'align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch;',
        description:
          "Aligns a flex container's lines within when there is extra space in the cross-axis. Only applies to multi-line flex containers.",
      },
      {
        code: 'gap: <row-gap> <column-gap>;',
        description:
          'Sets the gaps (gutters) between rows and columns. Can be specified as gap, row-gap, and column-gap.',
        visual: `<div style="display:flex;flex-wrap:wrap;gap:10px;width:150px;height:100px;background:#f0f0f0;margin-top:10px">
          <div style="background:#4285f4;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">1</div>
          <div style="background:#ea4335;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
          <div style="background:#fbbc05;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">3</div>
          <div style="background:#34a853;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">4</div>
        </div>
        <div style="font-size:12px;margin-top:5px">gap: 10px</div>`,
      },
    ],
  },
  {
    title: 'Flexbox Item Properties',
    examples: [
      {
        code: 'order: <integer>;',
        description:
          'Controls the order in which flex items appear in the flex container. Default is 0. Items with the same order value are laid out in source order.',
        visual: `<div style="display:flex;width:100%;height:50px;background:#f0f0f0;margin-top:10px">
          <div style="background:#4285f4;width:40px;color:white;display:flex;align-items:center;justify-content:center;order:3">1</div>
          <div style="background:#ea4335;width:40px;color:white;display:flex;align-items:center;justify-content:center;order:1">2</div>
          <div style="background:#fbbc05;width:40px;color:white;display:flex;align-items:center;justify-content:center;order:2">3</div>
        </div>
        <div style="font-size:12px;margin-top:5px">Item 1: order:3, Item 2: order:1, Item 3: order:2</div>`,
      },
      {
        code: 'flex-grow: <number>;',
        description:
          'Defines the ability for a flex item to grow if necessary. Default is 0. Determines how much the flex item will grow relative to the rest of the flex items.',
        visual: `<div style="display:flex;width:100%;height:50px;background:#f0f0f0;margin-top:10px">
          <div style="background:#4285f4;flex-grow:1;color:white;display:flex;align-items:center;justify-content:center">1</div>
          <div style="background:#ea4335;flex-grow:2;color:white;display:flex;align-items:center;justify-content:center">2</div>
          <div style="background:#fbbc05;flex-grow:1;color:white;display:flex;align-items:center;justify-content:center">3</div>
        </div>
        <div style="font-size:12px;margin-top:5px">Item 1: flex-grow:1, Item 2: flex-grow:2, Item 3: flex-grow:1</div>`,
      },
      {
        code: 'flex-shrink: <number>;',
        description:
          'Defines the ability for a flex item to shrink if necessary. Default is 1. Determines how much the flex item will shrink relative to the rest of the flex items.',
      },
      {
        code: 'flex-basis: <length> | auto;',
        description:
          'Defines the default size of an element before the remaining space is distributed. Can be a length (e.g., 20%, 5rem, etc.) or auto.',
        visual: `<div style="display:flex;width:100%;height:50px;background:#f0f0f0;margin-top:10px">
          <div style="background:#4285f4;flex-basis:100px;color:white;display:flex;align-items:center;justify-content:center">1</div>
          <div style="background:#ea4335;flex-basis:200px;color:white;display:flex;align-items:center;justify-content:center">2</div>
          <div style="background:#fbbc05;flex-basis:100px;color:white;display:flex;align-items:center;justify-content:center">3</div>
        </div>
        <div style="font-size:12px;margin-top:5px">Item 1: flex-basis:100px, Item 2: flex-basis:200px, Item 3: flex-basis:100px</div>`,
      },
      {
        code: 'flex: <flex-grow> <flex-shrink> <flex-basis>;',
        description:
          'Shorthand property for flex-grow, flex-shrink, and flex-basis. Default is 0 1 auto. Example: flex: 1 1 auto;',
      },
      {
        code: 'align-self: auto | flex-start | flex-end | center | baseline | stretch;',
        description:
          'Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.',
        visual: `<div style="display:flex;align-items:center;width:100%;height:80px;background:#f0f0f0;margin-top:10px">
          <div style="background:#4285f4;width:40px;height:30px;color:white;display:flex;align-items:center;justify-content:center;align-self:flex-start">1</div>
          <div style="background:#ea4335;width:40px;height:40px;color:white;display:flex;align-items:center;justify-content:center">2</div>
          <div style="background:#fbbc05;width:40px;height:50px;color:white;display:flex;align-items:center;justify-content:center;align-self:flex-end">3</div>
        </div>
        <div style="font-size:12px;margin-top:5px">Item 1: align-self:flex-start, Item 2: default, Item 3: align-self:flex-end</div>`,
      },
    ],
  },
  {
    title: 'Grid Container Properties',
    examples: [
      {
        code: 'display: grid;',
        description:
          'Defines a grid container, enabling a grid context for all its direct children.',
      },
      {
        code: 'grid-template-columns: <track-size>... | repeat(<number>, <track-size>);',
        description:
          'Defines the columns of the grid with a space-separated list of values. Values can be lengths, percentages, or fractions (fr).',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:1fr 2fr 1fr;width:100%;height:50px;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center">1fr</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center">2fr</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center">1fr</div>
          </div>
          <div style="font-size:12px;margin-top:5px">grid-template-columns: 1fr 2fr 1fr;</div>
        </div>
        <div style="margin-top:15px">
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);width:100%;height:50px;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center">1</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center">2</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center">3</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center">4</div>
          </div>
          <div style="font-size:12px;margin-top:5px">grid-template-columns: repeat(4, 1fr);</div>
        </div>`,
      },
      {
        code: 'grid-template-rows: <track-size>... | repeat(<number>, <track-size>);',
        description:
          'Defines the rows of the grid with a space-separated list of values. Values can be lengths, percentages, or fractions (fr).',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-rows:50px 100px 50px;width:100%;height:200px;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center">50px</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center">100px</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center">50px</div>
          </div>
          <div style="font-size:12px;margin-top:5px">grid-template-rows: 50px 100px 50px;</div>
        </div>`,
      },
      {
        code: 'grid-template-areas: "<grid-area-name> | . | none"...;',
        description:
          'Defines named grid areas, which can then be referenced using the grid-area property. Each area is defined by apostrophes, with each string representing a row.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:50px 100px 50px;grid-template-areas:'header header header' 'sidebar content content' 'footer footer footer';width:100%;height:200px;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center;grid-area:header">Header</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center;grid-area:sidebar">Sidebar</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center;grid-area:content">Content</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center;grid-area:footer">Footer</div>
          </div>
          <div style="font-size:12px;margin-top:5px">grid-template-areas: 'header header header' 'sidebar content content' 'footer footer footer';</div>
        </div>`,
      },
      {
        code: 'grid-auto-columns: <track-size>...;',
        description:
          'Specifies the size of any auto-generated grid columns (implicit grid tracks).',
      },
      {
        code: 'grid-auto-rows: <track-size>...;',
        description:
          'Specifies the size of any auto-generated grid rows (implicit grid tracks).',
      },
      {
        code: 'grid-auto-flow: row | column | dense;',
        description:
          'Controls how the auto-placement algorithm works, specifying exactly how auto-placed items get flowed into the grid.',
      },
      {
        code: 'gap: <row-gap> <column-gap>;',
        description:
          'Sets the gaps (gutters) between rows and columns. Can be specified as gap, row-gap, and column-gap.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;width:100%;height:100px;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center">1</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center">2</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center">3</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center">4</div>
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center">5</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center">6</div>
          </div>
          <div style="font-size:12px;margin-top:5px">gap: 10px;</div>
        </div>`,
      },
      {
        code: 'justify-items: start | end | center | stretch;',
        description:
          'Defines how grid items are justified within their grid area along the row axis.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);justify-items:center;width:100%;height:50px;background:#f0f0f0">
            <div style="background:#4285f4;width:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
            <div style="background:#ea4335;width:30px;color:white;display:flex;align-items:center;justify-content:center">2</div>
            <div style="background:#fbbc05;width:30px;color:white;display:flex;align-items:center;justify-content:center">3</div>
          </div>
          <div style="font-size:12px;margin-top:5px">justify-items: center;</div>
        </div>`,
      },
      {
        code: 'align-items: start | end | center | stretch;',
        description:
          'Defines how grid items are aligned within their grid area along the column axis.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);align-items:center;width:100%;height:80px;background:#f0f0f0">
            <div style="background:#4285f4;height:30px;color:white;display:flex;align-items:center;justify-content:center">1</div>
            <div style="background:#ea4335;height:30px;color:white;display:flex;align-items:center;justify-content:center">2</div>
            <div style="background:#fbbc05;height:30px;color:white;display:flex;align-items:center;justify-content:center">3</div>
          </div>
          <div style="font-size:12px;margin-top:5px">align-items: center;</div>
        </div>`,
      },
      {
        code: 'justify-content: start | end | center | stretch | space-around | space-between | space-evenly;',
        description:
          'Defines how the grid is justified within the grid container along the row axis when the total grid size is less than the container size.',
      },
      {
        code: 'align-content: start | end | center | stretch | space-around | space-between | space-evenly;',
        description:
          'Defines how the grid is aligned within the grid container along the column axis when the total grid size is less than the container size.',
      },
    ],
  },
  {
    title: 'Grid Item Properties',
    examples: [
      {
        code: 'grid-column-start: <number> | <name> | span <number> | span <name> | auto;',
        description:
          'Specifies the start position of a grid item within the grid column.',
      },
      {
        code: 'grid-column-end: <number> | <name> | span <number> | span <name> | auto;',
        description:
          'Specifies the end position of a grid item within the grid column.',
      },
      {
        code: 'grid-row-start: <number> | <name> | span <number> | span <name> | auto;',
        description:
          'Specifies the start position of a grid item within the grid row.',
      },
      {
        code: 'grid-row-end: <number> | <name> | span <number> | span <name> | auto;',
        description:
          'Specifies the end position of a grid item within the grid row.',
      },
      {
        code: 'grid-column: <start-line> / <end-line> | <start-line> / span <value>;',
        description: 'Shorthand for grid-column-start and grid-column-end.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);grid-template-rows:repeat(2, 50px);width:100%;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center;grid-column:1 / 3">1 / 3</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center;grid-column:3 / 5">3 / 5</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center;grid-column:1 / 5">1 / 5</div>
          </div>
          <div style="font-size:12px;margin-top:5px">Item 1: grid-column:1 / 3, Item 2: grid-column:3 / 5, Item 3: grid-column:1 / 5</div>
        </div>`,
      },
      {
        code: 'grid-row: <start-line> / <end-line> | <start-line> / span <value>;',
        description: 'Shorthand for grid-row-start and grid-row-end.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);grid-template-rows:repeat(4, 50px);width:100%;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center;grid-row:1 / 3">1 / 3</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center;grid-row:3 / 5">3 / 5</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center;grid-row:1 / 5">1 / 5</div>
          </div>
          <div style="font-size:12px;margin-top:5px">Item 1: grid-row:1 / 3, Item 2: grid-row:3 / 5, Item 3: grid-row:1 / 5</div>
        </div>`,
      },
      {
        code: 'grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;',
        description:
          'Either specifies a name for the grid item (to be used in grid-template-areas), or a shorthand for grid-row-start, grid-column-start, grid-row-end, and grid-column-end.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);grid-template-rows:repeat(3, 50px);grid-template-areas:'header header header' 'sidebar content content' 'footer footer footer';width:100%;background:#f0f0f0">
            <div style="background:#4285f4;color:white;display:flex;align-items:center;justify-content:center;grid-area:header">header</div>
            <div style="background:#ea4335;color:white;display:flex;align-items:center;justify-content:center;grid-area:sidebar">sidebar</div>
            <div style="background:#fbbc05;color:white;display:flex;align-items:center;justify-content:center;grid-area:content">content</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center;grid-area:footer">footer</div>
          </div>
          <div style="font-size:12px;margin-top:5px">Named grid areas with grid-area property</div>
        </div>`,
      },
      {
        code: 'justify-self: start | end | center | stretch;',
        description:
          'Aligns a grid item inside its cell along the row axis. Overrides the justify-items value of the parent.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);width:100%;height:50px;background:#f0f0f0">
            <div style="background:#4285f4;width:30px;color:white;display:flex;align-items:center;justify-content:center;justify-self:start">S</div>
            <div style="background:#ea4335;width:30px;color:white;display:flex;align-items:center;justify-content:center;justify-self:end">E</div>
            <div style="background:#fbbc05;width:30px;color:white;display:flex;align-items:center;justify-content:center;justify-self:center">C</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center;justify-self:stretch">stretch</div>
          </div>
          <div style="font-size:12px;margin-top:5px">start, end, center, stretch</div>
        </div>`,
      },
      {
        code: 'align-self: start | end | center | stretch;',
        description:
          'Aligns a grid item inside its cell along the column axis. Overrides the align-items value of the parent.',
        visual: `<div style="margin-top:10px">
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);width:100%;height:80px;background:#f0f0f0">
            <div style="background:#4285f4;height:30px;color:white;display:flex;align-items:center;justify-content:center;align-self:start">S</div>
            <div style="background:#ea4335;height:30px;color:white;display:flex;align-items:center;justify-content:center;align-self:end">E</div>
            <div style="background:#fbbc05;height:30px;color:white;display:flex;align-items:center;justify-content:center;align-self:center">C</div>
            <div style="background:#34a853;color:white;display:flex;align-items:center;justify-content:center;align-self:stretch">stretch</div>
          </div>
          <div style="font-size:12px;margin-top:5px">start, end, center, stretch</div>
        </div>`,
      },
    ],
  },
];

const CssLayoutCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CodeCategory[]>(
    cssLayoutExamplesData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(cssLayoutExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = cssLayoutExamplesData
      .map((category) => {
        const matchedExamples = category.examples.filter(
          (example) =>
            example.code.toLowerCase().includes(query) ||
            example.description.toLowerCase().includes(query)
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
          <FaCss3Alt className="inline-block mr-2" /> CSS Flexbox & Grid Cheat
          Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference for CSS Flexbox and Grid Layout properties
          with visual examples. Click the copy button to copy any code snippet
          to your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={cssLayoutExamplesData} />

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
              placeholder="Search CSS properties or descriptions..."
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
              id={category.title.replace(/\s+/g, '-').toLowerCase()}
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
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {example.description}
                          </p>
                          {example.visual && (
                            <div
                              className="mt-2 border border-gray-200 dark:border-gray-700 rounded p-2"
                              dangerouslySetInnerHTML={{
                                __html: example.visual,
                              }}
                            />
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
              No properties found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About CSS Layout Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About CSS Flexbox & Grid
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>CSS Flexbox</strong> (Flexible Box Layout) and{' '}
            <strong>CSS Grid</strong> are powerful layout systems for creating
            responsive web designs.
          </p>
          <p>
            <strong>Flexbox</strong> is designed for one-dimensional layouts
            (either rows OR columns), making it ideal for:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Navigation menus and toolbars</li>
            <li>Centering elements vertically and horizontally</li>
            <li>Distributing space among items with different sizes</li>
            <li>Creating flexible form controls</li>
          </ul>
          <p className="mt-2">
            <strong>CSS Grid</strong> is designed for two-dimensional layouts
            (rows AND columns), making it perfect for:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Page layouts and overall site structure</li>
            <li>Card layouts and image galleries</li>
            <li>
              Complex positioning that requires both row and column alignment
            </li>
            <li>Overlapping elements</li>
          </ul>
          <p className="mt-2">
            Both layout systems can be used together, with Grid handling the
            overall page layout and Flexbox managing the alignment within Grid
            cells.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MDN Flexbox documentation
            </a>{' '}
            and{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MDN Grid documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default CssLayoutCheatSheetPage;
