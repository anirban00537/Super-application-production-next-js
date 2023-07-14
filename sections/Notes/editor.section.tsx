import "@remirror/styles/all.css";
import {
  BoldExtension,
  HeadingExtension,
  ItalicExtension,
  UnderlineExtension,
  LinkExtension,
  HardBreakExtension,
  TaskListExtension,
  OrderedListExtension,
  BulletListExtension,
  wysiwygPreset,
  TableCellExtension,
  TableExtension,
  DropCursorExtension,
  CalloutExtension,
  CodeMirrorExtension,
  ColumnAttributes,
  ColumnsExtension,
  FontFamilyExtension,
  HorizontalRuleExtension,
  ImageExtension,
  SubExtension,
  SupExtension,
} from "remirror/extensions";
import {
  BasicFormattingButtonGroup,
  HeadingLevelButtonGroup,
  ListButtonGroup,
  HistoryButtonGroup,
  useRemirror,
  Remirror,
  ThemeProvider,
  Toolbar,
  ToggleStrikeButton,
  ToggleCodeBlockButton,
  OnChangeJSON,
  useSuggest,
  FloatingWrapper,
  ToggleBoldButton,
  ToggleCalloutButton,
  ToggleColumnsButton,
  DecreaseFontSizeButton,
  useCommands,
  useActive,
  CommandButtonGroup,
  DropdownButton,
  CommandMenuItem,
  InsertHorizontalRuleButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useDebounce } from "use-debounce";
// import EditorHeader from "../EditorHeader";
import { useNoteEditor } from "@/hooks/notes.hook";
import EditorHeader from "./editorHeader.section";
const TWO_COLUMNS: ColumnAttributes = {
  count: 2,
  fill: "balance",
  ruleColor: "darkred",
  ruleStyle: "dashed",
  ruleWidth: "thick",
  gap: "5em",
};
const THREE_COLUMNS: ColumnAttributes = {
  count: 3,
};
const EditorSection = ({ notesDetails, id }: any): JSX.Element => {
  const { updateNote, updateNoteTitle } = useNoteEditor();
  const [detailsState, setDetailsState] = useState(notesDetails);
  const [contentValue, setContent] = useState();
  const [value] = useDebounce(contentValue, 1500);
  const extensions = useCallback(
    () => [
      new HeadingExtension(),
      new BoldExtension({}),
      new ItalicExtension(),
      new LinkExtension({ autoLink: true }),
      new UnderlineExtension(),
      new TableCellExtension(),
      new TableExtension({
        disableExtraAttributes: false,
      }),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new TaskListExtension(),
      new HeadingExtension(),
      new HardBreakExtension(),
      new DropCursorExtension(),
      new CalloutExtension(),
      new CodeMirrorExtension(),
      new ColumnsExtension(),
      new FontFamilyExtension(),
      new HorizontalRuleExtension(),
      new ImageExtension(),
      new SubExtension(),
      new SupExtension(),
      ...wysiwygPreset(),
    ],
    []
  );
  useEffect(() => {
    if (detailsState?.id && value) {
      updateNote(detailsState, value);
    }
  }, [value]);
  useEffect(() => {
    setDetailsState(notesDetails);
  }, [notesDetails]);
  const { manager, state } = useRemirror({
    extensions,
    content: notesDetails?.content ? notesDetails?.content : content,
    selection: "end",
    stringHandler: "html",
  });

  return (
    <div className="m-5">
      {notesDetails?.title && (
        <EditorHeader
          notesDetails={notesDetails}
          updateNoteTitle={updateNoteTitle}
        />
      )}
      <AllStyledComponent>
        <ThemeProvider>
          <Remirror
            manager={manager}
            initialContent={state}
            autoFocus
            autoRender="end"
          >
            <Toolbar>
              <HistoryButtonGroup />
              <BasicFormattingButtonGroup />
              <HeadingLevelButtonGroup showAll />
              <ListButtonGroup />
              <ToggleStrikeButton />
              <ToggleCodeBlockButton />
              <ToggleCalloutButton />
              <ToggleSubscriptButton />
              <ToggleSuperscriptButton />
              <ToggleColumnsButton attrs={TWO_COLUMNS} />
              <ToggleColumnsButton attrs={THREE_COLUMNS} />
              <FontFamilyButtons />
              <InsertHorizontalRuleButton />
              <OnChangeJSON
                onChange={(e: any) => {
                  setContent(e);
                }}
              />
              <CmdMenu />
            </Toolbar>
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </div>
  );
};
const FONT_FAMILIES: Array<[React.CSSProperties["fontFamily"], string]> = [
  ["serif", "Serif"],
  ["sans-serif", "San serif"],
  ["cursive", "Cursive"],
  ["fantasy", "Fantasy"],
];

const FontFamilyButtons = () => {
  const { setFontFamily } = useCommands();
  const active = useActive();
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label="Font family" icon="text">
        {FONT_FAMILIES.map(([fontFamily, label]) => (
          <CommandMenuItem
            key={fontFamily}
            commandName="setFontFamily"
            onSelect={() => setFontFamily(fontFamily as string)}
            enabled={setFontFamily.enabled(fontFamily as string)}
            active={active.fontFamily({ fontFamily })}
            label={<span style={{ fontFamily }}>{label}</span>}
          />
        ))}
      </DropdownButton>
    </CommandButtonGroup>
  );
};
function CmdMenu() {
  const {
    change,
    exit,
    setMarkRemoved,
    clearIgnored,
    ignoreNextExit,
    addIgnored,
  } = useSuggest({
    char: "/",
    name: "command",
  });

  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(Boolean(change));
  }, [Boolean(change)]);

  return (
    <FloatingWrapper
      positioner="cursor"
      enabled={enabled}
      placement="bottom-start"
    >
      <a
        href="#"
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <ToggleBoldButton
          onClick={() => {
            setEnabled(false);
            clearIgnored();
          }}
        />
        <ToggleCodeBlockButton
          onClick={() => {
            setEnabled(false);
            clearIgnored();
          }}
        />
      </a>
    </FloatingWrapper>
  );
}

const html = String.raw; // Just for better editor support

const content = html`<ul></ul>`;
export default EditorSection;
