'use client'

import { useCallback } from "react";
import { convertToHighlightedJson, convertToJsonNodeData, convertToJsonValue } from "./json-convert";

export const useJsonConvert = () => {

  const _convertToJsonValue = useCallback(convertToJsonValue, [])

  const _convertToJsonNodeData = useCallback(convertToJsonNodeData, [])


  const _convertToHighlightedJson = useCallback(convertToHighlightedJson, [])

  return { 
    convertToJsonValue: _convertToJsonValue,
    convertToJsonNodeData: _convertToJsonNodeData,
    convertToHighlightedJson: _convertToHighlightedJson
  }
}